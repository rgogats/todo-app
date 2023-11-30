const ToDo = ((title, desc, listId) => {
    let priorityLevel;
    let dueDate;
    let status = 'active';
    let descPreview = desc.length > 20 ? desc.slice(0,20) + '[...]' : desc;

    const getTodo = () => {
        return {
            title: title,
            desc: desc,
            descPreview: descPreview,
        };
    }

    const editTodo = (newTitle, newDesc) => {
        title = newTitle;
        desc = newDesc;
    }

    const setPriority = (level) => {
        priorityLevel = level;
    }

    const setDueDate = (date) => {
        dueDate = date;
    }

    const finishTodo = () => {
        status = 'done';
        console.log('status: ', status);
    }

    const moveTodo = (newListId) => {
        listId = newListId;
    }

    return { getTodo, editTodo, setPriority, setDueDate, moveTodo, finishTodo };
});

export default ToDo;