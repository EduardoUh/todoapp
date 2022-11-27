import './styles.css';

// import { Todo } from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';
import { Todo, TodoList } from './classes/index';
import { crearTodoHtml, cargarTodosPendientes } from './js/componentes';

// const tarea = new Todo('Aprender JavaScript!!');
// const tarea2 = new Todo('Aprender React!!');
export const todoList = new TodoList();

// tarea2.completado = true;

// todoList.nuevoTodo(tarea);
// todoList.nuevoTodo(tarea2);
// console.log(todoList);

// crearTodoHtml(tarea);
// crearTodoHtml(tarea2);

/* La diferencia entre Local Storage y Session Storage es que la
información almacenada en Local Storage no posee tiempo de expiración,
por el contrario la información almacenada en Session Storage es
eliminada cuando se cierra el navegador (se cierra la tarea del
navegador), la información almacenada en ambos es visible para
cualquier usuario, por lo que no es recomendable almacenar información
sensible como contraseñas, usuarios, etc.
Nota: Existira un Local Storage por dominio es decir, hay uno para
facebook, instagram, youtube y en este caso el que estoy usando es el
de localhost, sin embargo, este cambiara si la aplicación se despliega
a un host distinto */

/* localStorage.setItem('mi-key', 'ABC1234');
sessionStorage.setItem('mi-key', '123456');
setTimeout(() => {
    localStorage.removeItem('mi-key');
    sessionStorage.removeItem('mi-key');
}, 1500); */

// Reconstruyendo todos los todos no borrados

todoList.todos.forEach(todo => {
    crearTodoHtml(todo);
});

/* cuando solo se necesita pasar un argumento entonces se puede
simplificar el callback de la siguiente manera

todoList.todos.forEach(crearTodoHtml);
Comprobado, si funciona
*/

/* Comprobación de que se han reconstruido las instancias de
los todos*/

// todoList.todos[0].imprimirClase(); Si funciona

// cargando todos Pendientes

cargarTodosPendientes();