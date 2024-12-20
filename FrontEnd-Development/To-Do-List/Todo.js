function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');
    const todoDuration = document.getElementById('todo-duration');
    const todoItems = document.getElementById('todo-items');

    if (todoInput.value.trim() === '' || !todoDate.value || !todoDuration.value) {
        alert('Please fill in all fields!');
        return;
    }

    const taskDate = new Date(todoDate.value);
    const completionTime = parseInt(todoDuration.value, 10);

    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span>${todoInput.value.trim()}</span>
        <small>Due: ${taskDate.toLocaleString()}</small>
        <small>Complete in: ${completionTime} minutes</small>
        <button onclick="deleteTodo(this)">Delete</button>
    `;

    todoItems.appendChild(li);

    // Schedule reminder
    scheduleReminder(todoInput.value.trim(), taskDate, completionTime);

    // Clear inputs
    todoInput.value = '';
    todoDate.value = '';
    todoDuration.value = '';
}

function deleteTodo(button) {
    const li = button.parentElement;
    li.remove();
}

function scheduleReminder(task, taskDate, duration) {
    const currentTime = new Date();
    const reminderTime = taskDate - currentTime - duration * 60000; // Convert duration to milliseconds

    if (reminderTime > 0) {
        setTimeout(() => {
            alert(`Reminder: It's time to work on "${task}"!`);
        }, reminderTime);
    } else {
        alert(`The task "${task}" is already overdue!`);
    }
}
