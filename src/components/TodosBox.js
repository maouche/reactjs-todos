import { useState } from "react";

function TodosBox () {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState([]);

	const handleChange = function (e) {
		setInput(input => e.target.value)
	}

	const handleSubmit = function (e) {
		e.preventDefault();
		if ( input !== "") {
			setTodos(todos => [{"text": input}, ...todos])
			setInput(input => "")
		}
	}

	const handleRemove = function (e, index) {
		e.preventDefault()
		setTodos( todos => todos.filter(todo => todo !== todos[index]) )
	}

	return (
		<div className="box">
			<h1 className="title">todos.length(s) left</h1>
			<form className="form" onSubmit={(e) => handleSubmit(e)}>
				<input className="input" type="text" value={input} onChange={(e) => handleChange(e)} />
				<button type="submit" className="btn" onClick={handleSubmit}>Add</button>
			</form>
			<ul className="list">
				{todos.map((todo, index) =>
					<li className="item" key={index}>
						<span className="text">{todo.text}</span>
						<button className="btn danger" onClick={(e) => handleRemove(e, index)}>Delete</button>
					</li>)}
			</ul>
		</div>
	);
} 

export default TodosBox;