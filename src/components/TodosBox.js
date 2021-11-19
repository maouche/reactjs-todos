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
			setTodos(todos => [{"text": input, done: false}, ...todos])
			setInput(input => "")
		}
	}

	const handleRemove = function (e, index) {
		e.preventDefault()
		setTodos( todos => todos.filter(todo => todo !== todos[index]) )
	}

	const changeDone = function (e, index) {
		e.preventDefault()
		setTodos(todoss => {
			var newTodos = []
			for (var i = 0; i < todoss.length; i++) {
				if (i === index) {
					newTodos.push({...todoss[i], done: !todoss[i].done})
				} else {
					newTodos.push(todoss[i])
				}
			}
			return newTodos
		})
	}

	return (
		<div className="box">
			<h1 className="title">{todos.length} todo(s) left</h1>
			<form className="form" onSubmit={(e) => handleSubmit(e)}>
				<input className="input" type="text" value={input} onChange={(e) => handleChange(e)} placeholder="What needs to be done ?" />
			</form>
			<ul className="list">
				{todos.map((todo, index) =>
					<li className="item" key={index}>
						<input className="checkbox" id={"checkbox" + index} type="checkbox" onClick={(e) => changeDone(e, index)} />
						<label htmlFor={"checkbox" + index} className={"text" + (todo.done ? " active" : "")}>
							<span className={"boxx" + (todo.done ? " checked" : "")}></span>
							{todo.text}
						</label>
						<button className="btn danger" onClick={(e) => handleRemove(e, index)}>Delete</button>
					</li>)}
			</ul>
		</div>
	);
} 

export default TodosBox;