let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks from array
function renderTask(task) {
    const list = document.querySelector('.list');
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const leftContainer = document.createElement('div');
    leftContainer.classList.add('left-container');

    const checkbox = document.createElement('div');
    checkbox.classList.add('check-box');
    if (task.complete) checkbox.style.backgroundColor = 'dimgrey';

    const span = document.createElement('span');
    span.textContent = task.description;
    if (task.complete) span.style.textDecoration = 'line-through';

    checkbox.addEventListener('click', () => {
        task.complete = true; // update array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // save
        checkbox.style.backgroundColor = 'dimgrey';
        span.style.textDecoration = 'line-through';
    });

    leftContainer.appendChild(checkbox);
    leftContainer.appendChild(span);

    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-trash-can');
    icon.addEventListener('click', () => {
        list.removeChild(taskContainer); // remove from DOM
        tasks = tasks.filter(t => t !== task); // remove from array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // save
    });

    taskContainer.appendChild(leftContainer);
    taskContainer.appendChild(icon);
    list.appendChild(taskContainer);
}

// Load saved tasks on page load
tasks.forEach(task => renderTask(task));

// Add new task
document.querySelector('.enter-btn').addEventListener('click', () => {
    const inputTask = document.querySelector('.search-input');
    if (!inputTask.value.trim()) return;

    const newTask = { description: inputTask.value, complete: false };
    tasks.push(newTask); // add to array
    localStorage.setItem('tasks', JSON.stringify(tasks)); // save
    renderTask(newTask); // add to DOM
    inputTask.value = '';
});
