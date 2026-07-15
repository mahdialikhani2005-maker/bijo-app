from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)  # این خط مهمه که اجازه بده از هرجایی درخواست بزنی

# فایل دیتا توی خود سرور رندر ذخیره میشه
DATA_FILE = 'data.json'

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    else:
        default_data = {
            "users": {},
            "courses": [
                {"id": 1, "name": "انگلیسی مقدماتی", "level": "A1", "lessons": 10},
                {"id": 2, "name": "انگلیسی متوسط", "level": "B1", "lessons": 15},
                {"id": 3, "name": "انگلیسی پیشرفته", "level": "C1", "lessons": 12}
            ],
            "progress": {}
        }
        save_data(default_data)
        return default_data

def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route('/api/courses', methods=['GET'])
def get_courses():
    data = load_data()
    return jsonify(data['courses'])

@app.route('/api/login', methods=['POST'])
def login():
    data = load_data()
    user_data = request.json
    username = user_data.get('username')
    password = user_data.get('password')
    
    if username in data['users'] and data['users'][username]['password'] == password:
        return jsonify({
            "success": True, 
            "user": username,
            "progress": data['progress'].get(username, {})
        })
    return jsonify({"success": False, "message": "نام کاربری یا رمز عبور اشتباه است"}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = load_data()
    user_data = request.json
    username = user_data.get('username')
    
    if username in data['users']:
        return jsonify({"success": False, "message": "این کاربر قبلاً ثبت‌نام کرده"}), 400
    
    data['users'][username] = {
        "password": user_data.get('password'),
        "email": user_data.get('email'),
        "joined": "2026-07-15"
    }
    data['progress'][username] = {}
    save_data(data)
    return jsonify({"success": True, "message": "ثبت‌نام موفق"})

@app.route('/api/progress', methods=['POST'])
def save_progress():
    data = load_data()
    progress_data = request.json
    username = progress_data.get('username')
    course_id = str(progress_data.get('course_id'))
    lesson_id = str(progress_data.get('lesson_id'))
    status = progress_data.get('status')
    
    if username not in data['progress']:
        data['progress'][username] = {}
    if course_id not in data['progress'][username]:
        data['progress'][username][course_id] = {}
    
    data['progress'][username][course_id][lesson_id] = status
    save_data(data)
    return jsonify({"success": True})

@app.route('/api/progress/<username>', methods=['GET'])
def get_progress(username):
    data = load_data()
    progress = data['progress'].get(username, {})
    return jsonify(progress)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)  # پورت ۱۰۰۰۰ برای رندر