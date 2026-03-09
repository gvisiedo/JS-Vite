import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementsIds = {
    TodoList : '.todo-list',
    NewTodoInput:'#new-todo-input',
}

/**
 * 
 * @param {String} elementId
 */

export const App = (elementId)=>{
    const displayTodos = ()=>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementsIds.TodoList, todos);
    }

    //cuando la función App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();

    //Refrencia HTML
const newDescriptionInput = document.querySelector(ElementsIds.NewTodoInput);
    //Listeners
    newDescriptionInput.addEventListener('keyup',(event)=>{
        
    })
}