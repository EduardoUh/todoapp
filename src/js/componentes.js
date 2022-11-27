// Referencias en el html
import { Todo } from "../classes/";
import { todoList } from "../index";


const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const buttonClearCompleted = document.querySelector('.clear-completed');
const todoCount = document.querySelector('.todo-count').firstChild;
const ulFilters = document.querySelector('.filters');
const anchorTags = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view" >
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    /* divTodoList.innerHTML += htmlTodo; otra manera de hacerlo 
    sin crear un div */
    // Usando un div y después eliminandolo
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
};

// Eventos

txtInput.addEventListener('keyup', function (event) {
    if ((event.keyCode === 13) && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        cargarTodosPendientes();
        //txtInput.reset;
    }
});

divTodoList.addEventListener('click', (event) => {
    // console.log('clicked: ', event.target.localName);
    const nombreElementoDiv = event.target.localName; // será un input, label o button
    // console.log(nombreElementoDiv);
    const liElementoDiv = event.target.parentElement.parentElement;
    // console.log(liElementoDiv);
    const divElementId = liElementoDiv.getAttribute('data-id');
    // console.log(divElementId);

    if ((nombreElementoDiv.includes('input'))) { // Marcar como hecho
        todoList.marcarCompletado(divElementId);
        // toggle es para cuando se va a estar agregando o cambiando una clase
        liElementoDiv.classList.toggle('completed');
        // console.log(todoList);
        cargarTodosPendientes();
    } else if ((nombreElementoDiv.includes('button'))) { // Eliminar todo
        todoList.eliminarTodo(divElementId);
        divTodoList.removeChild(liElementoDiv);
        // console.log(todoList);
        cargarTodosPendientes();
    }
});

buttonClearCompleted.addEventListener('click', () => {
    console.log(todoList);
    const completedTodo = document.querySelectorAll('.completed');
    todoList.eliminarCompletado();
    /* for (let i = 0; i < completedTodo.length; i++) {
        completedTodo[i].parentNode.removeChild(completedTodo[i]);
    } */
    for (let todoCompleted of completedTodo) {
        todoCompleted.parentNode.removeChild(todoCompleted);
    }
});

ulFilters.addEventListener('click', (event) => {
    /* Documentación de interes: 
    https://stackoverflow.com/questions/15439853/get-local-href-value-from-anchor-a-tag*/
    const clickedChildren = event.target.text;
    if (!clickedChildren) { return; }
    anchorTags.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');
    for (const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');
        switch (clickedChildren) {
            case 'Pendientes':
                if (completado) {
                    element.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    element.classList.add('hidden');
                }
                break;
        }
    }
});

export const cargarTodosPendientes = () => {
    let todosPendientes = todoList.todosPendientes();
    todoCount.innerText = todosPendientes;
};