const allTodoLists = [];

const getAllTodoLists = () => {
    return allTodoLists;
}

const TodoList = ((id, label) => {
    console.log('new todolist', id, label);
    const todos = [];
    let status = 'active';

    const getTodos = () => todos;

    const getLabel = () => label;

    const getId = () => id;

    const editLabel = (newLabel) => {
        label = newLabel;
    };
    
    const addTodo = (todo) => {
        todos.push(todo);
        todo.moveTodo(id);
    };
    const removeTodo = (todo) => {
        for (let i = 0; i < todos.length; i++) {
            return todos[i] === todo ? (todos.splice(todos[i], 1), console.log('updated todos in list', todos)) : 'Todo not found';
        }
    };
    
    const deleteList = () => {
        status = 'deleted';
    };

    allTodoLists.push({ id, label });
    console.log('all todolists', allTodoLists);
    console.log('all todolists.length', allTodoLists.length);

    return { getTodos, addTodo, removeTodo, getLabel, getId, editLabel, deleteList };
});

export { getAllTodoLists, TodoList };