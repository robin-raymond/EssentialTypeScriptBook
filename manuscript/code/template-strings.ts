	var todo = {
	    id: 123,
	    name: "Pick up drycleaning",
	    completed: true
	}
	
	container.innerHTML = `
	    <div todo='${todo.id}' class="list-group-item}">
	        <i class="[[ If Todo is complete, then "hidden" ]] text-success glyphicon glyphicon-ok"></i>
	        <span class="name">${todo.name}</span>
	    </div>
	`
