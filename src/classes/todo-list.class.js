import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        /* this.todos = []; ya no es necesario porque ya se inicializa
        en el método "cargarLocalStorage()" */
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
        this.todosPendientes();
    }

    eliminarTodo(id) {
        /* documentación muy interesante acerca de los arreglos:
        https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter */
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
        this.todosPendientes();
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            // console.log(id, ':', typeof id); string
            // console.log(todo.id, ':', typeof todo.id); number
            if ((todo.id == id)) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                this.todosPendientes();
                break;
            }
        }
    }

    eliminarCompletado() {
        //                                     todo.completado == false
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
        this.todosPendientes();
    }

    guardarLocalStorage() {
        /* JSON es una notación (JavaScript Object Notation) y el método
        stringify convierte el argumento enviado a la notación JSON */
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        /* if (localStorage.getItem('todo')) {
            // Convierte un JSON a un objeto
            this.todos = JSON.parse(localStorage.getItem('todo'));
            console.log('cargar local storage: ', this.todos);
            console.log(typeof this.todos);
        }
        else {
            this.todos = [];
        } 
        Con operador ternario: */
        this.todos = (localStorage.getItem('todo'))
            ? JSON.parse(localStorage.getItem('todo'))
            : [];
        /* De esta manera se reconstruyen todas las instancias de los 
        todos 
        this.todos = this.todos.map(todo => Todo.fromJson(todo));
         */

        /* Debido a que solo se envía un argumento se puede hacer los
         siguiente: */
        console.warn('Como se puede observar ahora es un arreglo de instancias y no un arreglo de objetos literales');
        this.todos = this.todos.map(Todo.fromJson);
        console.log(this.todos);
    }

    todosPendientes() {
        let numtodosPendientes = this.todos.filter(todo => !todo.completado);
        return numtodosPendientes.length;
    }
}