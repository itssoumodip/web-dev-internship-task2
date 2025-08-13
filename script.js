// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Elements
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // To-Do List Elements
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    
    // Form Validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        // Validate Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        // Validate Phone (optional but must be valid if entered)
        if (phoneInput.value.trim() !== '' && !isValidPhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        } else {
            removeError(phoneInput);
        }
        
        // Validate Subject
        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'Subject is required');
            isValid = false;
        } else {
            removeError(subjectInput);
        }
        
        // Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else {
            removeError(messageInput);
        }
        
        if (isValid) {
            // Form is valid, show success message
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });
    
    // To-Do List Functionality
    addTaskButton.addEventListener('click', function() {
        addTask();
    });
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Load saved tasks on page load
    loadTasks();
});

// Helper Functions for Form Validation
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorMessage.textContent = message;
}

function removeError(input) {
    const formGroup = input.parentElement;
    
    formGroup.classList.remove('error');
    formGroup.querySelector('.error-message').textContent = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
}

// Helper Functions for To-Do List
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
    
    if (taskValue !== '') {
        // Create new task element
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        
        // Add task content
        taskItem.innerHTML = `
            <span class="task-text">${taskValue}</span>
            <div class="task-actions">
                <button class="task-btn complete-btn" title="Mark as complete">✓</button>
                <button class="task-btn delete-btn" title="Delete task">✕</button>
            </div>
        `;
        
        // Add event listeners to buttons
        taskItem.querySelector('.complete-btn').addEventListener('click', function() {
            taskItem.classList.toggle('completed');
            saveTasks();
        });
        
        taskItem.querySelector('.delete-btn').addEventListener('click', function() {
            taskItem.remove();
            saveTasks();
        });
        
        // Add task to list
        document.getElementById('taskList').appendChild(taskItem);
        
        // Clear input
        taskInput.value = '';
        
        // Save tasks to localStorage
        saveTasks();
    }
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
    
    // Get all tasks
    taskList.querySelectorAll('.task-item').forEach(function(taskItem) {
        const taskText = taskItem.querySelector('.task-text').textContent;
        const isCompleted = taskItem.classList.contains('completed');
        
        tasks.push({
            text: taskText,
            completed: isCompleted
        });
    });
    
    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        const taskList = document.getElementById('taskList');
        
        tasks.forEach(function(task) {
            // Create task element
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            
            // Add task content
            taskItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="task-btn complete-btn" title="Mark as complete">✓</button>
                    <button class="task-btn delete-btn" title="Delete task">✕</button>
                </div>
            `;
            
            // Add event listeners to buttons
            taskItem.querySelector('.complete-btn').addEventListener('click', function() {
                taskItem.classList.toggle('completed');
                saveTasks();
            });
            
            taskItem.querySelector('.delete-btn').addEventListener('click', function() {
                taskItem.remove();
                saveTasks();
            });
            
            // Add task to list
            taskList.appendChild(taskItem);
        });
    }
}
