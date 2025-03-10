import json
import os

def read_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
        return None
    except json.JSONDecodeError as e:
        print(f"Error: Failed to decode JSON from the file {file_path}. Error: {e}")
        return None

def process_data(data):
    # Process the data as needed
    pass

if __name__ == "__main__":
    # Provide the correct path to the JSON file
    json_file = 'C:/Users/zhegazy/OneDrive - Deloitte (O365D)/Documents/Agentic Workforce/task_manager/resume_analyzer_chat.json'
    
    # Check if the file exists
    if not os.path.exists(json_file):
        print(f"Error: The file {json_file} does not exist.")
    else:
        data = read_json_file(json_file)
        if data:
            process_data(data)