import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementsIds = {
    ClearCompletedButton:'.clear-completed',
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
const todoListUL = document.querySelector(ElementsIds.TodoList);    
const clearCompletedButton = document.querySelector(ElementsIds.ClearCompletedButton);
//Listeners
    newDescriptionInput.addEventListener('keyup',(event)=>{
       if(event.keyCode !== 13) return;
       if(event.target.value.trim().lenght === 0) return;
       todoStore.addTodo(event.target.value);
       displayTodos();
       event.target.value=''; 
    });

    todoListUL.addEventListener('click',(event)=>{
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });
    todoListUL.addEventListener('click',(event)=>{
        const isDestroyElement = event.target.className === 'destroy';
       const element = event.target.closest('[data-id]');
        if(!isDestroyElement)return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });
    clearCompletedButton.addEventListener('click',()=>{
        todoStore.deleteCompleted();
        displayTodos();
    })
}