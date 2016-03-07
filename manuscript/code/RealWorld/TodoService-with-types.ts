interface Todo {
    id: number;
    name: string;
    state: TodoState;
}

enum TodoState {
    Active = 1,
    Complete = 2
}

interface ITodoService {
    add(todo: Todo): Todo;
    add(todo: string): Todo;
    clearCompleted(): void;
    getAll(): Todo[];
    getById(todoId: number): Todo;
    toggle(todoId: number): void;
}

class TodoService implements ITodoService {
    
    private static _lastId = 0;

    private static generateTodoId(): number {
        return TodoService._lastId += 1;
    }
    
    private static clone(src) {
        var clone = JSON.stringify(src);
        return JSON.parse(clone);
    };

    private todos = [];

    constructor(todos: string[]) {
        var _this = this;
        
        if(todos) {
            todos.forEach(function(todo) { _this.add(todo) });
        }
    }

    add(input) {

        var todo = {
            id: TodoService.generateTodoId(),
            name: null,
            state: 1
        };

        if(typeof input === 'string') {
            todo.name = input;
        } 
        else if(typeof input.name === 'string') {
            todo.name = input.name;
        } else {
            throw 'Invalid Todo name!';
        }

        this.todos.push(todo);

        return todo;
    };


    clearCompleted() {
       
        this.todos = this.todos.filter(
            function(x) { x.state == 1; }
        );
    }
    

    getAll() {
        return TodoService.clone(this.todos);
    };


    getById(todoId) {
        var todo = this._find(todoId);
        return TodoService.clone(todo);
    };
    
    toggle(todoId): void {

        var todo = this._find(todoId);
        
        if(!todo) return;
        
        switch(todo.state) {
            case 1:
                todo.state = 2;
                break;
                
            case 2:
                todo.state = 1;
                break;
        }
    }

    private _find(todoId) {
        var filtered = this.todos.filter(
            function(x) { x.id == todoId; }
        );
        
        if (filtered.length) {
            return filtered[0];
        }
        
        return null;
    }
}