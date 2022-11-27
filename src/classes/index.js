/* De esta manera el index en src, no estará lleno de importaciones y en
su lugar las importaciones estarán centralizadas en un único archivo */
import { Todo } from './todo.class';
import { TodoList } from './todo-list.class';

export {
    Todo,
    TodoList
}