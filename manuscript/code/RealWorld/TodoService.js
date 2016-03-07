var TodoService = (function () {

    // Private, static variable
    var _lastId = 0;

    // Private, static method
    function generateTodoId() {
        return _lastId += 1;
    }
    
    // Private, static method
    function clone(src) {
        var clone = JSON.stringify(src);
        return JSON.parse(clone);
    };

    // Constructor method
    function TodoService(todos) {
        var _this = this;
        
        this.todos = [];
        
        if(todos) {
            todos.forEach(function(todo) {
              _this.add(todo);  
            })
        }
    }

    // input parameter can be either string or object ({ name })
    TodoService.prototype.add = function (input) {

        var todo = {
            id: generateTodoId(),
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

    TodoService.prototype.clearCompleted = function () {
       
        this.todos = this.todos.filter(function(x) { 
            return x.state == 1; 
        });
    }

    TodoService.prototype.getAll = function () {
        // Don't return the actual array - clone it instead
        return clone(this.todos);
    };

    TodoService.prototype.getById = function (todoId) {
        var todo = this._find(todoId);
        // Don't return the actual object - clone it instead
        return clone(todo);
    };
    
    TodoService.prototype.toggle = function (todoId) {

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

    // "Private" method (just because it starts with an _)
    TodoService.prototype._find = function (todoId) {
        var filtered = this.todos.filter(function (x) { 
            return x.id == todoId; 
        });
        
        if (filtered.length) {
            return filtered[0];
        }
        
        return null;
    }

    // Return the class from the IIFE    
    return TodoService;
})();