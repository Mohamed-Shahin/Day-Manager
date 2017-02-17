(function(scope) {
    "use strict";
    var form = document.querySelector('form');
    var editForm = document.getElementById("edit-task");
    var tasksContainer = document.querySelector('#tasks');
    var taskManager = createTaskManager();
    document.getElementById("edit-task-button").disabled = true;
    form && form.addEventListener('submit', addTask);
    editForm && editForm.addEventListener('submit', editTask)
    taskManager.onChange(update);
    loadTasks();

    function addTask(event) {
        event.preventDefault();
        var task = {};
        event.target.querySelectorAll('input:not([type="submit"]').forEach(function(input) {
            task[input.name] = input.value;
            input.value = null;
        });
        taskManager.create(task.category, task.title, task.priority, task.estimate);
    }

    function update(tasks) {
        while (tasksContainer.hasChildNodes()) {
            tasksContainer.removeChild(tasksContainer.lastChild);
        }

        taskManager.getAll().forEach(function(task) {
            tasksContainer.appendChild(createTaskRow(task));
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskRow(task) {
        var tr = document.createElement('tr');
        tr.appendChild(createTableCell(task.category));
        tr.appendChild(createTableCell(task.title));
        tr.appendChild(createTableCell(task.priority));
        tr.appendChild(createTableCell(task.estimate));
        alert(task.spent);
        tr.appendChild(createTableCell(task.spent));
        tr.appendChild(createTableCell(task.remaining));
        tr.appendChild(createTableCell(task.done() && '&#10004;'));
        var deleteCell = document.createElement('td');
        var deleteLink = document.createElement('a');
        deleteLink.innerHTML = "DELETE";
        deleteLink.addEventListener('click', function() {
            taskManager.remove(task);
        });
        deleteCell.appendChild(deleteLink);
        tr.appendChild(deleteCell);
        var editCell = document.createElement('td');
        var editLink = document.createElement('a');
        editLink.innerHTML = "EDIT";
        editLink.addEventListener('click', function() {
            fillEditForm(task)
        });
        editCell.appendChild(editLink)
        tr.appendChild(editCell);
        return tr;
    }

    function createTableCell(text) {
        var td = document.createElement('td');
        if (text) {
            var text = document.createTextNode(text);
            td.appendChild(text);
        }
        return td;
    }

    function loadTasks() {
        if (typeof scope.localStorage !== undefined) {
            var tasks = JSON.parse(scope.localStorage.getItem('tasks'))
            tasks && tasks.forEach(function(task) {
                taskManager.create(task.category, task.title, task.priority, task.estimate);
            });
        }
    }

    function fillEditForm(task) {
        document.getElementById("edit-task-button").disabled = false;
        editForm.querySelectorAll('input:not([type="submit"]').forEach(function(input) {
            input.value = task[input.name];
        });
        document.getElementById("task-index").value = taskManager.getAll().indexOf(task);
    }

    function editTask(event) {
        event.preventDefault();
        var index = document.getElementById("task-index").value;
        var task = {};
        editForm.querySelectorAll('input:not([type="submit"]').forEach(function(input) {
            task[input.name] = input.value;
            input.value = null;
        });

        taskManager.updateTask(index, task);

    }
})(window);