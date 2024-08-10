document.addEventListener("DOMContentLoaded", () => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskManagerContainer = document.querySelector(".taskManager");
    const confirmEl = document.querySelector(".confirm");
    const confirmedBtn = confirmEl.querySelector(".confirmed");
    const cancelledBtn = confirmEl.querySelector(".cancel");
    let indexToBeDeleted = null;
    let indexToBeUpdated = null;
  
    document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('filterPriority').addEventListener('change', renderTasks);
  
    function handleFormSubmit(event) {
      event.preventDefault();
      const taskInput = document.getElementById('taskInput');
      const taskPriority = document.getElementById('taskPriority').value;
      const taskText = taskInput.value.trim();
  
      if (taskText !== '') {
        const newTask = {
          text: taskText,
          priority: taskPriority,
          completed: false
        };
  
        tasks.push(newTask);
        saveTasks();
        taskInput.value = '';
        renderTasks();
      }
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      const taskContainer = document.getElementById('taskContainer');
      const filterPriority = document.getElementById('filterPriority').value;
      taskContainer.innerHTML = '';
  
      tasks
        .filter(task => filterPriority === 'all' || task.priority === filterPriority)
        .forEach((task, index) => {
          const taskCard = document.createElement('div');
          taskCard.classList.add('taskCard', task.priority, task.completed ? 'completed' : 'pending');
  
          const taskText = document.createElement('p');
          taskText.innerText = task.text;
          taskText.classList.add('editable');
  
          const taskStatus = document.createElement('p');
          taskStatus.classList.add('status');
          taskStatus.innerText = task.completed ? 'Completed' : 'Pending';
  
          const toggleButton = document.createElement('button');
          toggleButton.classList.add("button-box");
          const btnContentEl = document.createElement("span");
          btnContentEl.classList.add("green");
          btnContentEl.innerText = task.completed ? 'Mark as Pending' : 'Mark as Completed';
          toggleButton.appendChild(btnContentEl);
          toggleButton.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
          });
  
          const deleteButton = document.createElement('button');
          deleteButton.classList.add("button-box");
          const delBtnContentEl = document.createElement("span");
          delBtnContentEl.classList.add("red");
          delBtnContentEl.innerText = 'Delete';
          deleteButton.appendChild(delBtnContentEl);
          deleteButton.addEventListener('click', () => {
            indexToBeDeleted = index;
            confirmEl.style.display = "block";
            taskManagerContainer.classList.add("overlay");
          });
  
          const editButton = document.createElement('button');
          editButton.classList.add("button-box");
          const editBtnContentEl = document.createElement("span");
          editBtnContentEl.classList.add("blue");
          editBtnContentEl.innerText = 'Edit';
          editButton.appendChild(editBtnContentEl);
          editButton.addEventListener("click", () => {
            indexToBeUpdated = index;
            document.getElementById("taskInput").value = tasks[index].text;
            document.getElementById("add").style.display = "none";
            document.getElementById("update").style.display = "block";
          });
  
          taskCard.appendChild(taskText);
          taskCard.appendChild(taskStatus);
          taskCard.appendChild(toggleButton);
          taskCard.appendChild(editButton);
          taskCard.appendChild(deleteButton);
  
          taskContainer.appendChild(taskCard);
        });
    }
  
    document.getElementById("update").addEventListener("click", function() {
      const input = document.getElementById("taskInput");
      if (indexToBeUpdated !== null) {
        tasks[indexToBeUpdated].text = input.value.trim();
        saveTasks();
        renderTasks();
        input.value = '';
        document.getElementById("add").style.display = "block";
        document.getElementById("update").style.display = "none";
        indexToBeUpdated = null;
      }
    });
  
    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  
    confirmedBtn.addEventListener("click", () => {
      confirmEl.style.display = "none";
      taskManagerContainer.classList.remove("overlay");
      deleteTask(indexToBeDeleted);
    });
  
    cancelledBtn.addEventListener("click", () => {
      confirmEl.style.display = "none";
      taskManagerContainer.classList.remove("overlay");
    });
  
    renderTasks();
  });
  