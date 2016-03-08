enum TodoState {
    New = 1,
    Active = 2,
    Complete = 3,
    Deleted = 4
}

	class TodoStateChanger {
	    
	    constructor(private newState: TodoState) {
	    }
	    
	    canChangeState(todo: Todo): boolean {
	        return !!todo;
	    }
	    
	    changeState(todo: Todo): Todo {
	        if(this.canChangeState(todo)) {
	            todo.state = this.newState;
	        }
	        
	        return todo;
	    }
	    
	}
    
    
    
    class CompleteTodoStateChanger extends TodoStateChanger {
        constructor() {
            super()
        }
	}