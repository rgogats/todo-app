import { getAllTodoLists, TodoList } from './todoList.js';
import Todo from './todo.js';

const UIController = (() => {
    // initialize default list and todolist-container element
    const bodyContent = document.querySelector('div#content');
    const pageHeader = document.querySelector('h1');    
    const newTodoButton = document.querySelector('button#new-todo');
    const todoModal = document.querySelector('div#newTodoModal');
    const todoForm = document.querySelector('form');
    const title = document.querySelector('input#title.form-control');
    const desc = document.querySelector('textarea#desc.form-control');
    const listSelector = document.querySelector('select#list.form-control');
    const closeFormButton = document.querySelector('button.close');
    const newlistButton = document.querySelector('button#new-todolist');

    // create empty todolist-container
    const todoListContainer = document.createElement('div');
    todoListContainer.className = 'todolist-container';
    const listLabelHeader = document.createElement('h3');
    listLabelHeader.className = 'list-label';
    todoListContainer.appendChild(listLabelHeader);
    bodyContent.appendChild(todoListContainer);

    // create default list
    const defaultList = TodoList(0, 'Default List');
    listLabelHeader.textContent = defaultList.getLabel();

    newTodoButton.addEventListener('click', (()=> {
        console.log('click new todo');
        todoModal.style.display = 'block';
        console.log(listSelector);

        for(let i = 0; i < getAllTodoLists().length; i++) {
            const listOption = document.createElement('option');
            listOption.value = getAllTodoLists()[i].label;
            listSelector.appendChild(listOption);
            listOption.textContent = getAllTodoLists()[i].label;
        };
    }));

    closeFormButton.addEventListener('click', (() => {
        todoModal.style.display = 'none';
    }));

    todoForm.addEventListener('submit', ((e) => {
        e.preventDefault();

        let matchIndex;
        let matchingListContainer;
        for(let i = 0; i < getAllTodoLists().length; i++) {
            getAllTodoLists()[i].label === listSelector.value ? (matchIndex = getAllTodoLists()[i].id, console.log('match found', getAllTodoLists()[i])) : console.log('noMatch');
            // listSelector.value === list.label ? console.log('match found') : console.log('noMatch');
            // selector.value === todoList.title ? matchIndex = todoList.id
        };
        if(matchIndex) {
            console.log(`matching... ${matchIndex}`);
            matchingListContainer = document.querySelector(`div.todolist-container[data-index="${matchIndex}"]`);
            console.log('matchingListContainer', matchingListContainer);
        }
        // append todoList

        const newTodo = Todo(title.value, desc.value, matchIndex);
        console.log('newTodo', newTodo);
        defaultList.addTodo(newTodo);
        
        const todoContainer = document.createElement('div');
        todoContainer.className = 'todo-container';
        matchingListContainer.appendChild(todoContainer);

        const todoItemTitle = document.createElement('div');
        todoItemTitle.className = 'todo-title';
        const todoItemDesc = document.createElement('div');
        todoItemDesc.className = 'todo-desc';
        todoItemTitle.textContent = `Title: ${newTodo.getTodo().title}`;
        todoItemDesc.textContent = `Description: ${newTodo.getTodo().descPreview}`;
        const todoEditButton = document.createElement('button');
        todoEditButton.className = 'edit';
        todoEditButton.textContent = 'Edit';
        const todoDeleteButton = document.createElement('button');
        todoDeleteButton.className = 'delete';
        todoDeleteButton.textContent = 'Delete';

        title.value = '';
        desc.textContent = '';

        todoContainer.appendChild(todoItemTitle);
        todoContainer.appendChild(todoItemDesc);
        todoContainer.appendChild(todoEditButton);
        todoContainer.appendChild(todoDeleteButton);

        todoContainer.addEventListener('click', (() => {
            console.log('expanded details here');
            // add logic to expand description
        }));

        todoEditButton.addEventListener('click', (() => {
            console.log('edit form here');
            // add edit form logic
        }));

        todoDeleteButton.addEventListener('click', (() => {
            console.log('delete logic here');
            // add delete todo logic
        }));

        todoModal.style.display = 'none';

    }));

    newlistButton.addEventListener('click', (() => {
        const listContainer = document.createElement('div');
        const listLabelInput = document.createElement('input');
        const listLabelHeader = document.createElement('h3');
        let newList;

        listLabelInput.addEventListener('keypress', ((e) => {
            e.key === "Enter" ? (
                newList = TodoList(getAllTodoLists().length, listLabelInput.value),
                console.log("getAllTodoLists.length", getAllTodoLists().length),
                listContainer.removeChild(listLabelInput), 
                listLabelHeader.className = 'list-label',
                listLabelHeader.textContent = newList.getLabel(),
                console.log(newList.getLabel()), 
                listContainer.dataset.index = newList.getId()
            ) : null;
        }))
        
        listContainer.className = 'todolist-container';
        listContainer.appendChild(listLabelHeader);
        listContainer.appendChild(listLabelInput);
        bodyContent.appendChild(listContainer);
        console.log('add listContainer', listContainer);
    }));
    

});

export default UIController;