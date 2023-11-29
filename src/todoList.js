const ToDoList = ((id, label) => {
    const todos = [];
    let status = 'active';

    const getTodos = () => todos;

    const getLabel = () => label;

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

    return { getTodos, addTodo, removeTodo, getLabel, editLabel, deleteList };
});

export default ToDoList;