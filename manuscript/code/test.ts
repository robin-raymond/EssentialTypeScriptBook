class TodoService {

    constructor(private todos: Todo[]) {
    }

    getAll() {
        return this.todos;
    }
}
