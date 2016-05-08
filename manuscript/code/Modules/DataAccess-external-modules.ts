import Model = require('./Model');
import Todo = Model.Todo;

export interface ITodoService {
  add(todo: Todo): Todo;
  delete(todoId: number): void;
  getAll(): Todo[];
  getById(todoId: number): Todo;
}

let _lastId: number = 0;

function generateId() {
  return _lastId += 1;
}

export class TodoService implements ITodoService {

  constructor(private todos: Todo[]) {
  }

  add(todo: Todo): Todo {
    todo.id = generateId();

    this.todos.push(todo);

    return todo;
  }

  delete(todoId: number): void {
    var toDelete = this.getById(todoId);

    var deletedIndex = this.todos.indexOf(toDelete);

    this.todos.splice(deletedIndex, 1);
  }

  getAll(): Todo[] {
    var clone = JSON.stringify(this.todos);
    return JSON.parse(clone);
  }

  getById(todoId: number): Todo {
    var filtered =
      this.todos.filter(x => x.id == todoId);

    if (filtered.length) {
      return filtered[0];
    }

    return null;
  }
}