document.addEventListener('DOMContentLoaded', function () {
    getTasks();
  });
  
  function getTasks() {
    fetch('/tasks')
      .then(response => response.json())
      .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.className = 'task-item';
          li.innerHTML = `
            <div>
              <p>${task.title}</p>
            </div>
            <div class="actions">
              <i class="fas fa-edit" onclick="updateTask('${task._id}', '${task.title}')"></i>
              <i class="fas fa-trash-alt" onclick="deleteTask('${task._id}')"></i>
            </div>
          `;
  
          taskList.appendChild(li);
        });
      });
  }
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const title = taskInput.value;
  
    if (title.trim() !== '') {
      fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      })
        .then(response => response.json())
        .then(() => {
          taskInput.value = '';
          getTasks();
        });
    }
  }
  
  function updateTask(id, currentTitle) {
    const newTitle = prompt('Update task:', currentTitle);
  
    if (newTitle !== null) {
      fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
      })
        .then(response => response.json())
        .then(() => getTasks());
    }
  }
  
  function deleteTask(id) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
  
    if (confirmDelete) {
      fetch(`/tasks/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(() => getTasks());
    }
  }
  