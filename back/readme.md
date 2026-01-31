# Flask Backend - Python Conversion

## Installation

1. **Create a virtual environment** :
```bash
python -m venv venv
source venv/bin/activate 
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

## Running the Application

```bash
python app.py
```

server will start on `http://localhost:3000`

## Endpoints

### POST `/login`
- **Body** (JSON):
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response**: returns authentication token and sets cookie

### POST `/file-upload`
- **Body** (multipart/form-data):
  - `file`: file to upload
- **Response**: confirmation of successful upload

## Key Differences from Express.js

1. **File Uploads**: uses `werkzeug.utils.secure_filename()`
2. **CORS**: uses `flask-cors` library
3. **JSON Parsing**: flask automatically handles JSON with `request.json`
4. **Cookies**: uses `make_response()` and `set_cookie()`

## Notes

- upload folder is created automatically if it doesnt exist
- ChromaDB downloaded only for now
- max file upload size is set to 16MB