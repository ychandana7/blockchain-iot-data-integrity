from flask import Flask, render_template, request, redirect, url_for, flash
import hashlib
import os
import json
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'secret'  # Required for flash messages
app.config['UPLOAD_FOLDER'] = 'uploads'
DB_FILE = 'files_db.json'

# Load data if exists
if os.path.exists(DB_FILE):
    with open(DB_FILE, 'r') as f:
        files_db = json.load(f)
else:
    files_db = []

blockchain = files_db.copy()  # Initially use same data for blockchain log

# Load user credentials from users.json
def load_users():
    with open('users.json', 'r') as f:
        return json.load(f)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        users = load_users()  # Load users from JSON

        # Check if the credentials are valid
        if email in users and users[email] == password:
            return redirect(url_for('upload_file'))  # Redirect to the upload page
        else:
            flash("Authentication failed: Invalid email or password")  # Show error message
            return redirect(url_for('login'))  # Reload the login page
    return render_template('login.html')

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    message = None
    file_id = None
    file_hash = None

    if request.method == 'POST':
        file = request.files['file']
        if file:
            data = file.read()
            file_hash = hashlib.sha256(data).hexdigest()
            file_id = hashlib.md5(data).hexdigest()

            filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            with open(filepath, 'wb') as f:
                f.write(data)

            file_record = {
                'id': file_id,
                'filename': file.filename,
                'hash': file_hash,
                'timestamp': str(datetime.now())
            }

            files_db.append(file_record)
            blockchain.append(file_record)

            # Save to JSON file
            with open(DB_FILE, 'w') as f:
                json.dump(files_db, f, indent=4)

            message = "File uploaded successfully!"

    return render_template('upload.html', message=message, file_id=file_id, file_hash=file_hash)

@app.route('/verify', methods=['GET', 'POST'])
def verify_file():
    result = None
    gen_hash = None
    stored_hash = None

    if request.method == 'POST':
        file_id = request.form['file_id']
        uploaded_file = request.files['file']
        record = next((f for f in files_db if f['id'] == file_id), None)

        if record and uploaded_file:
            data = uploaded_file.read()
            gen_hash = hashlib.sha256(data).hexdigest()
            stored_hash = record['hash']
            result = "Verified ✅" if gen_hash == stored_hash else "Mismatch ❌"
        else:
            result = "File Tampered ❌"

    return render_template('verify.html',
                           verification_result=result,
                           generated_hash=gen_hash,
                           stored_hash=stored_hash)

@app.route('/blockchain')
def blockchain_page():
    return render_template('index.html')  # Blockchain hash page

@app.route('/blockchain_log')
def blockchain_log():
    logs = [f"{entry['timestamp']} - {entry['filename']} - Hash: {entry['hash']}" for entry in blockchain]
    return render_template('blockchain_log.html', logs=logs)

@app.route('/db_log')
def db_log():
    return render_template('db_log.html', files=files_db)

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)
