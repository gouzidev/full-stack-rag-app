from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './upload'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size


@app.route('/login', methods=['POST'])
def login():
    # if request has JSON data
    if not request.json:
        print(500)
        print("error happened during")
        return jsonify({
            "isError": True, 
            "msg": "error happened during parsing the request"
        }), 500
    
    # for username
    if 'username' not in request.json:
        print(400)
        print("please enter a username")
        return jsonify({
            "isError": True, 
            "msg": "please enter a valid username"
        }), 400
    
    # for password
    if 'password' not in request.json:
        print(400)
        print("please enter a password")
        return jsonify({
            "isError": True, 
            "msg": "please enter a valid password"
        }), 400
    
    username = request.json['username']
    
    # validate username length
    if len(username) < 8:
        print(400)
        print("please enter username long")
        return jsonify({
            "isError": True, 
            "msg": "please enter an username longer than 8 caracters"
        }), 400
    
    password = request.json['password']
    
    # validate password length
    if len(password) < 8:
        print(400)
        print("please enter password long")
        return jsonify({
            "isError": True, 
            "msg": "please enter an password longer than 8 caracters"
        }), 400
    
    print(200)
    print("logged in successfully")
    
    # make response with cookie
    response = make_response(jsonify({
        "isError": False, 
        "msg": "logged in successfully", 
        "data": {"token": "123"}
    }))
    response.set_cookie('token', '123')
    
    return response, 200


@app.route('/file-upload', methods=['POST'])
def file_upload():
    # if file is in request
    if 'file' not in request.files:
        return jsonify({
            "isError": True, 
            "msg": "No file part in request"
        }), 400
    
    file = request.files['file']
    
    # if file is selected
    if file.filename == '':
        return jsonify({
            "isError": True, 
            "msg": "No file selected"
        }), 400
    
    if file:
        # secure the filename and save
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        print(f"File saved: {filepath}")
        
        # client = Client()
        
        return jsonify({
            "isError": False, 
            "msg": "file uploaded succesfully"
        }), 201


if __name__ == '__main__':
    app.run(debug=True, port=3000)