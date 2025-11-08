let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Sort task, make the task that yet complete move to top
function renderTask() {
    tasks.sort((a, b) => a.complete - b.complete);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.querySelector('.list').innerHTML = ''
    tasks.forEach(task => generateTask(task));
}

// Render tasks from array
function generateTask(task) {
    const list = document.querySelector('.list');
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const leftContainer = document.createElement('div');
    leftContainer.classList.add('left-container');

    const span = document.createElement('span');
    span.textContent = task.description;

    // check-box
    const checkbox = document.createElement('div');
    checkbox.classList.add('check-box');
    if (task.complete) checkbox.classList.add('checked');   // Keep the style on completed task when page reload
    checkbox.addEventListener('click', () => {
        task.complete = !task.complete;
        if(task.complete === true) {
            checkbox.classList.add('checked');
        } else {
            checkbox.classList.remove('checked');
        }
        renderTask();
    });

    // delete-icon
    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-trash-can');
    icon.addEventListener('click', () => {
        list.removeChild(taskContainer); // remove from DOM
        tasks = tasks.filter(t => t !== task); // remove from array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // save
    });
    
    leftContainer.appendChild(checkbox);
    leftContainer.appendChild(span);
    taskContainer.appendChild(leftContainer);
    taskContainer.appendChild(icon);
    list.appendChild(taskContainer);
}

function addTask() {
    const inputTask = document.querySelector('.search-input');
    if (!inputTask.value.trim()) return;
    const newTask = { description: inputTask.value, complete: false };
    tasks.unshift(newTask); // add to array
    renderTask();
    // generateTask(newTask);
    inputTask.value = '';
}

// Load saved task to page when load
tasks.forEach(task => generateTask(task));

// Add new task when click on the 'Enter-icon'
document.querySelector('.enter-btn').addEventListener('click', () => {
    addTask();
});

// Add new task when pres 'Enter'
document.querySelector('body').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        addTask();
    }
}); 
