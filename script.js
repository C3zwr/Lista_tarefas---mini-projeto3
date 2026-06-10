const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');

// Carregar tarefas do localStorage ao iniciar
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => {
        addTaskToDOM(taskText);
    });
}

// Adicionar tarefa ao DOM
function addTaskToDOM(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="deleteBtn">&times;</button>
    `;
    
    const deleteBtn = li.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => {
        deleteTask(taskText, li);
    });
    
    taskList.appendChild(li);
}

// Deletar tarefa
function deleteTask(taskText, liElement) {
    // Remove do DOM
    liElement.remove();
    
    // Remove do localStorage
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks = savedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

// Adicionar nova tarefa
addTaskBtn.addEventListener('click', () => {
    if (taskInput.value.trim() === "") {
        alert("Por favor, digite uma tarefa antes de adicionar!");
    } else {
        const taskText = taskInput.value.trim();
        
        // Adicionar ao DOM
        addTaskToDOM(taskText);
        
        // Salvar no localStorage
        let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        
        // Limpar input
        taskInput.value = "";
    }
});

// Permitir adicionar tarefa pressionando Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

// Carregar tarefas ao iniciar a página
loadTasks();
