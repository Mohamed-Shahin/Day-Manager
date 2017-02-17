(function(scope) {
    "use strict";
    var form = document.querySelector('form');
    var tasksContainer = document.querySelector('#tasks');
    var taskManager = createTaskManager();

    form && form.addEventListener('submit', addTask);
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
        tr.appendChild(createTableCell(task.spent));
        tr.appendChild(createTableCell(task.remaining));
        tr.appendChild(createTableCell(task.done() && '&#10004;'));
        var deleteLink = document.createElement('a')

        deleteLink.innerHTML = "DELETE"
        deleteLink.addEventListener('click', function() {
            taskManager.remove(task);
        });
        tr.appendChild(deleteLink);
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
})(window);