import unittest
from app import app, db, Task

class TaskTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

        # Create a new database for testing
        with app.app_context():
            db.create_all()

    def tearDown(self):
        # Remove the database session and drop all tables
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_create_task(self):
        response = self.app.post('/tasks', json={
            'title': 'Test Task',
            'description': 'This is a test task',
            'due_date': '2023-12-31'
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('Task created successfully', response.get_data(as_text=True))
        self.assertIn('id', response.get_json())

    def test_get_tasks(self):
        # First, create a task
        self.app.post('/tasks', json={
            'title': 'Test Task',
            'description': 'This is a test task',
            'due_date': '2023-12-31'
        })

        # Then, get the tasks
        response = self.app.get('/tasks')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Test Task', response.get_data(as_text=True))

    def test_update_task(self):
        # First, create a task
        response = self.app.post('/tasks', json={
            'title': 'Test Task',
            'description': 'This is a test task',
            'due_date': '2023-12-31'
        })
        task_id = response.get_json()['id']

        # Then, update the task
        response = self.app.put(f'/tasks/{task_id}', json={
            'title': 'Updated Task',
            'description': 'This is an updated test task',
            'due_date': '2023-12-31',
            'status': 'completed'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('Task updated successfully', response.get_data(as_text=True))

    def test_delete_task(self):
        # First, create a task
        response = self.app.post('/tasks', json={
            'title': 'Test Task',
            'description': 'This is a test task',
            'due_date': '2023-12-31'
        })
        task_id = response.get_json()['id']

        # Then, delete the task
        response = self.app.delete(f'/tasks/{task_id}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Task deleted successfully', response.get_data(as_text=True))

if __name__ == '__main__':
    unittest.main()