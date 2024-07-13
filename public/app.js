async function fetchTasks() {
    try {
        const response = await fetch('/tasks');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tasks = await response.json();
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.description;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteTask(task.id);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }
 }
 async function addTask() {
    try {
        const input = document.getElementById('task-input');
        const description = input.value;
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        input.value = '';
        fetchTasks();
    } catch (error) {
        console.error('Fetch error:', error);
    }
 }
 async function deleteTask(id) {
    try {
        const response = await fetch(`/tasks/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchTasks();
    } catch (error) {
        console.error('Fetch error:', error);
    }
 }
 document.addEventListener('DOMContentLoaded', fetchTasks);
