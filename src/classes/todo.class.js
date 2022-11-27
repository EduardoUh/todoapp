export class Todo {
    /* Al convertir los todos de JSON a objeto estos dejan de ser instancias
    de la clase Todo por tanto ya no tienen acceso a los métodos, por 
    lo que ahora vamos a recontstruirlos como instancias de la clase 
    o si quieres verlos así vamos a recuperar esas instancias */

    /* De esta manera se crea la instancia de nuevo, lo cual permite 
    recuperar los métodos de la clase */
    static fromJson({ id, tarea, completado, creado }) {
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.tarea = tarea;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea) {
        this.tarea = tarea;
        /* con el getTime() se obtiene la hora, minuto, mls actual, 
        lo cual se puede usar como un id debido a que es casi único */
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }

    imprimirClase() {
        console.log(`${this.tarea} - ${this.id}`);
    }
}