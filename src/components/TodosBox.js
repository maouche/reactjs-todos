import { useState } from "react";

function TodosBox () {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState(0);

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

	const renderTodo = function (todo, index) {
		if ( (filter == 0) || (filter == 1 && todo.done == false) || (filter == 2 && todo.done == true) )  {
			return (
				<li className="item" key={index}>
					<input id={"checkbox" + index} type="checkbox" onClick={(e) => changeDone(e, index)} />
					<label htmlFor={"checkbox" + index} className={"text" + (todo.done ? " active" : "")}>
						<span className={"checkbox" + (todo.done ? " checked" : "")}></span>
						{todo.text}
					</label>
					<button className="btn danger" onClick={(e) => handleRemove(e, index)}><span className="fa fa-remove"></span></button>
				</li>
			)
		}
	}

	return (
		<div className="box">
			<h1 className="title">{todos.length} todo(s) left</h1>
			<form className="form" onSubmit={(e) => handleSubmit(e)}>
				<input className="input" type="text" value={input} onChange={(e) => handleChange(e)} placeholder="What needs to be done ?" />
			</form>
			<div className="filters">
				<button className={"btn" + (filter === 0 ? " active" : "")} onClick={(e) => setFilter(filter => 0)}>All</button>
				<button className={"btn" + (filter === 1 ? " active" : "")} onClick={(e) => setFilter(filter => 1)}>Unfinished</button>
				<button className={"btn" + (filter === 2 ? " active" : "")} onClick={(e) => setFilter(filter => 2)}>Finished</button>
			</div>
			<ul className="list">
				{todos.map((todo, index) =>
					renderTodo(todo, index)
				)}
			</ul>
		</div>
	);
} 

export default TodosBox;