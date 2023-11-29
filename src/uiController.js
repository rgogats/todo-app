import ToDoList from './todoList.js';
import Todo from './todo.js';

const UIController = (() => {
    // initialize default list and todolist-container element
    const bodyContent = document.querySelector('div#content');
    const pageHeader = document.querySelector('h1');    
    pageHeader.style.fontSize =  '1.5rem';
    const newTodoButton = document.querySelector('button#new-todo');
    const todoModal = document.querySelector('div.modal');
    const todoForm = document.querySelector('form');
    const closeFormButton = document.querySelector('button.close');

    // create empty todolist-container
    const todoListContainer = document.createElement('div.todo-list');
    todoListContainer.className = 'todolist-container';
    const listLabelHeader = document.createElement('h3.list');

    // create default list
    const defaultList = ToDoList(1, 'Default List');
    listLabelHeader.textContent = defaultList.getLabel();

    newTodoButton.addEventListener('click', (()=> {
        console.log('click new todo');
        todoModal.style.display = 'block';
    }));

    closeFormButton.addEventListener('click', (() => {
        todoModal.style.display = 'none';
    }));

    todoForm.addEventListener('submit', ((e) => {
        e.preventDefault();
        const title = document.querySelector('input#title.form-control');
        const desc = document.querySelector('textarea#desc.form-control');
        console.log('todo contents', title.value, desc.value)
        const newTodo = Todo(title.value, desc.value, defaultList);
        console.log('newTodo', newTodo);
        defaultList.addTodo(newTodo);

        const todoContainer = document.createElement('div');
        todoContainer.className = 'todo-container';
        const todoItemTitle = document.createElement('div');
        todoItemTitle.className = 'todo-title';

        const todoItemDesc = document.createElement('div');
        todoItemTitle.className = 'todo-desc';

        todoContainer.appendChild(todoItemTitle);
        console.log('todoItemTitle', todoItemTitle);
        todoContainer.appendChild(todoItemDesc);
        console.log('todoItemDesc', todoItemDesc);
        todoListContainer.appendChild(todoContainer);
        console.log('todoContainer', todoContainer);

        todoItemTitle.textContent = `Title: ${newTodo.getTodo().title}`;
        todoItemDesc.textContent = `Description: ${newTodo.getTodo().descPreview}`;
        bodyContent.appendChild(todoListContainer);

        

        todoModal.style.display = 'none';

    }));

    console.log('defaultList', defaultList);
    

});

export default UIController;