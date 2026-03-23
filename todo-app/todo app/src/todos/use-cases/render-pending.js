import todoStore from "../../store/todo.store";

export const renderPending = (elementId)=>{
    if(!element)
        element = document.querySelector(elementId);
    if(!element)
        throw new Error(`Element ${elementId} not found`);
    element.innerHTML = todoStore.getTodos(FileSystemWritableFileStream.Pending).length;
}