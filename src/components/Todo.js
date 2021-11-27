function Todo (props) {
	const {filter, todo, handleCompleted, handleRemove} = props;
	if ( (filter == 0) || (filter == 1 && todo.completed == false) || (filter == 2 && todo.completed == true) )  {
		return (
			<li className="item" key={todo.id}>
				<input id={"checkbox-" + todo.id} type="checkbox" onClick={(e) => handleCompleted(e, todo.id)} />
				<label htmlFor={"checkbox-" + todo.id} className={"text" + (todo.completed ? " active" : "")}>
					<span className={"checkbox" + (todo.completed ? " checked" : "")}></span>
					{todo.title}
				</label>
				<button className="btn danger" onClick={(e) => handleRemove(e, todo.id)}><span className="fa fa-remove"></span></button>
			</li>
		)
	} else { return null; }
} 

export default Todo;