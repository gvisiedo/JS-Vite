import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

const ElementsIds = {
    ClearCompletedButton:'.clear-completed',
    TodoList : '.todo-list',
    NewTodoInput:'#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId
 */

export const App = (elementId)=>{
    const displayTodos = ()=>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementsIds.TodoList, todos);
        updatePendingCount();
    }
const updatePendingCount = ()=>{
    renderPending(ElementsIds.PendingCountLabel);
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
const fultersLIs = document.querySelectorAll(ElementsIds.TodoFilters)
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
    filtersLIs.forEach(element => {
        element.addEventListener('click', (element)=>{
            filtersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');
            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                break;
            }
            displayTodos();

        });
    });
}