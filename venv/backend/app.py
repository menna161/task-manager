from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    due_date = db.Column(db.String(10), nullable=False)
    status = db.Column(db.String(20), default='pending')

# Create database
with app.app_context():
    db.create_all()

# Routes
@app.route('/')
def home():
    return jsonify({'message': 'Task Manager API is running'}), 200

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    new_task = Task(
        title=data['title'],
        description=data.get('description', ''),
        due_date=data['due_date']
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({
        'id':new_task.id,
        'message': 'Task created successfully'}), 201

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'due_date': task.due_date,
        'status': task.status
    } for task in tasks])

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    task = Task.query.get_or_404(id)
    task.title = data['title']
    task.description = data.get('description', task.description)
    task.due_date = data['due_date']
    task.status = data.get('status', task.status)
    db.session.commit()
    return jsonify({'message': 'Task updated successfully'})

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
