import { getAllTodoLists, TodoList } from './todoList.js';
import { getAllTodos, ToDo } from './todo.js';

const UIController = (() => {
    // initialize default list and todolist-container element
    
    const bodyContent = document.querySelector('div#content');
    const newTodoButton = document.querySelector('button#new-todo');
    const todoModal = document.querySelector('div#newTodoModal');
    const viewModal = document.querySelector('div#viewTodoModal');
    const todoForm = document.querySelector('form');
    const title = document.querySelector('input#title.form-control');
    const desc = document.querySelector('textarea#desc');
    console.log('desc', desc);
    const listSelector = document.querySelector('select#list.form-control');
    const newModalCloseButton = document.querySelector('button#new.close');
    const viewModalCloseButton = document.querySelector('button#view.close');
    const newlistButton = document.querySelector('button#new-todolist');


    // create empty todolist-container
    const todoListContainer = document.createElement('div');
    todoListContainer.className = 'todolist-container';
    const listLabelHeader = document.createElement('h3');
    listLabelHeader.className = 'list-label';
    todoListContainer.appendChild(listLabelHeader);
    bodyContent.appendChild(todoListContainer);
    todoListContainer.dataset.index = '0';

    (() => {
        const savedTodos = localStorage.getItem('todos');
        const savedTodoLists = localStorage.getItem('todoLists');
        console.log('savedTodos', savedTodos);
        console.log('savedTodolists', savedTodoLists);
        
        if(savedTodoLists) {
            const todoListsArray = JSON.parse(savedTodoLists);
            console.log('todoListsArray', todoListsArray);
            todoListsArray.forEach(listData => {
                const todoList = TodoList(listData.id, listData.label);
                console.log('todoList.getLabel', todoList.getLabel());
                // add to UI
                const listContainer = document.createElement('div');
                listContainer.className = 'todolist-container';
                const listLabelHeader = document.createElement('h3');
                listLabelHeader.className = 'list-label';
                listLabelHeader.textContent = todoList.getLabel();
                listContainer.dataset.index = todoList.getId();
                bodyContent.appendChild(listContainer);
                listContainer.appendChild(listLabelHeader);
            });
        };
        
        if(savedTodos) {
            const todosArray = JSON.parse(savedTodos);
            console.log('todosArray', todosArray);
            todosArray.forEach(todoData => {
                const todo = ToDo(todoData.title, todoData.desc, todoData.listId);

                let matchingListContainer = document.querySelector(`div.todolist-container[data-index="${todoData.listId}"]`);
                
                const todoContainer = document.createElement('div');
                todoContainer.className = 'todo-container';
                matchingListContainer.appendChild(todoContainer);

                const todoItemTitle = document.createElement('div');
                todoItemTitle.className = 'todo-title';
                const todoItemDesc = document.createElement('div');
                todoItemDesc.className = 'todo-desc';
                todoItemTitle.textContent = `Title: ${todo.getTodo().title}`;
                todoItemDesc.textContent = `Description: ${todo.getTodo().descPreview}`;
                const todoViewButton = document.createElement('button');
                todoViewButton.className = 'view';
                todoViewButton.textContent = 'View details';
                const todoDoneButton = document.createElement('button');
                todoDoneButton.className = 'done';
                todoDoneButton.textContent = 'Mark as done';

                todoContainer.appendChild(todoItemTitle);
                todoContainer.appendChild(todoItemDesc);
                todoContainer.appendChild(todoViewButton);
                todoContainer.appendChild(todoDoneButton);
                
                

                todoViewButton.addEventListener('click', (() => {
                    viewModal.style.display = 'block'; 
                    const viewModalBody = viewModal.querySelector('.modal-body');
                    console.log('viewModal', viewModal);
                    const viewModalTitle = document.createElement('h6');
                    const viewModalDesc = document.createElement('p');
                    viewModalTitle.className = 'title';
                    viewModalTitle.textContent = `Title: ${newTodo.getTodo().title}`;
                    viewModalDesc.textContent = `Description: ${newTodo.getTodo().desc}`;
                    viewModalBody.appendChild(viewModalTitle);
                    viewModalBody.appendChild(viewModalDesc);
                }));

                todoDoneButton.addEventListener('click', ((e) => {
                    console.log('done logic here');
                    console.log('e.target.parentElement.parentElement', e.target.parentElement.parentElement);
                    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
                    newTodo.finishTodo();
                }));
                    })
                };            
    })();

    const saveData = () => {
        const todoLists = getAllTodoLists();
        localStorage.setItem('todoLists', JSON.stringify(todoLists));

        const todos = getAllTodos();
        localStorage.setItem('todos', JSON.stringify(todos));

        console.log('localStorage', localStorage);
    };

    // create default list
    const defaultList = TodoList(0, 'Default List');
    listLabelHeader.textContent = defaultList.getLabel();

    newTodoButton.addEventListener('click', (()=> {
        todoModal.style.display = 'block'; 

        while(listSelector.hasChildren) {
            listSelector.removeChild(listSelector.lastChild);
        };

        for(let i = 0; i < getAllTodoLists().length; i++) {
            const listOption = document.createElement('option');
            listOption.value = getAllTodoLists()[i].label;
            listSelector.appendChild(listOption);
            listOption.textContent = getAllTodoLists()[i].label;
        };
    }));

    newModalCloseButton.addEventListener('click', (() => {
        todoModal.style.display = 'none';
    }));
    viewModalCloseButton.addEventListener('click', (() => {
        viewModal.style.display = 'none';
    }));

    todoForm.addEventListener('submit', ((e) => {
        e.preventDefault();

        let matchIndex;
        let matchingListContainer;
        for(let i = 1; i < getAllTodoLists().length; i++) {
            getAllTodoLists()[i].label === listSelector.value ? (matchIndex = getAllTodoLists()[i].id, console.log('match found', getAllTodoLists()[i])) : console.log('noMatch');
        };
        console.log('matchIndex', matchIndex);
        matchIndex ? (
            console.log(`matching... ${matchIndex}`),
            matchingListContainer = document.querySelector(`div.todolist-container[data-index="${matchIndex}"]`)
            ) : (
                matchIndex = 0,
                matchingListContainer = document.querySelector('div.todolist-container[data-index="0"]')
                );

        console.log('matchingListContainer', matchingListContainer);

        const newTodo = ToDo(title.value, desc.value, matchIndex);
        console.log('newTodo', newTodo);
        saveData();
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
        const todoViewButton = document.createElement('button');
        todoViewButton.className = 'view';
        todoViewButton.textContent = 'View details';
        const todoDoneButton = document.createElement('button');
        todoDoneButton.className = 'done';
        todoDoneButton.textContent = 'Mark as done';

        title.value = '';
        desc.value = 'Enter your description here...';

        todoContainer.appendChild(todoItemTitle);
        todoContainer.appendChild(todoItemDesc);
        todoContainer.appendChild(todoViewButton);
        todoContainer.appendChild(todoDoneButton);

        todoContainer.addEventListener('click', (() => {
            console.log('expanded details here');
            // add logic to expand description
        }));

        todoViewButton.addEventListener('click', (() => {
            viewModal.style.display = 'block'; 
            const viewModalBody = viewModal.querySelector('.modal-body');
            console.log('viewModal', viewModal);
            const viewModalTitle = document.createElement('h6');
            const viewModalDesc = document.createElement('p');
            viewModalTitle.className = 'title';
            viewModalTitle.textContent = `Title: ${newTodo.getTodo().title}`;
            viewModalDesc.textContent = `Description: ${newTodo.getTodo().desc}`;
            viewModalBody.appendChild(viewModalTitle);
            viewModalBody.appendChild(viewModalDesc);
        }));

        todoDoneButton.addEventListener('click', ((e) => {
            console.log('done logic here');
            console.log('e.target.parentElement.parentElement', e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
            newTodo.finishTodo();
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
                listContainer.removeChild(listLabelInput), 
                listLabelHeader.className = 'list-label',
                listLabelHeader.textContent = newList.getLabel(),
                console.log(newList.getLabel()), 
                listContainer.dataset.index = newList.getId(),
                saveData()
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