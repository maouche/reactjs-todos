import { useState, useCallback, useEffect, useReducer } from "react";
import axios from "axios";
import Todo from "./Todo";
import reducer from "./reducer";

const apiUrl = "https://jsonplaceholder.typicode.com/todos";

function TodosBox () {
	const [input, setInput] = useState("");
	const [filter, setFilter] = useState(0);
	const [requestError, setRequestError] = useState("");
	const [items, dispatch] = useReducer(reducer, [])

	const fetchData = async () => {
		try {
			const result = await axios.get(apiUrl);
			dispatch({type: "fetch", items: result.data});
		} catch (err) {
			setRequestError(requestError => err.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, [])

	const handleChange = function (e) {
		setInput(input => e.target.value)
	}

	const handleSubmit = function (e) {
		e.preventDefault();
		if ( input !== "") {
			dispatch({type: "add", item: {"title": input, completed: false}})
			setInput(input => "")
		}
	}

	const handleRemove = function (e, id) {
		e.preventDefault()
		dispatch({type: "remove", id: id});
	}

	const handleCompleted = function (e, id, completed) {
		e.preventDefault();
		dispatch({type: "update", item: {id, completed} });
	}
	return (
		<div className="box">
			<h1 className="title">{items.length} todo(s) left</h1>
			<form className="form" onSubmit={(e) => handleSubmit(e)}>
				<input className="input" type="text" value={input} onChange={(e) => handleChange(e)} placeholder="What needs to be done ?" />
			</form>
			<div className="filters">
				<button className={"btn" + (filter === 0 ? " active" : "")} onClick={(e) => setFilter(filter => 0)}>All</button>
				<button className={"btn" + (filter === 1 ? " active" : "")} onClick={(e) => setFilter(filter => 1)}>Unfinished</button>
				<button className={"btn" + (filter === 2 ? " active" : "")} onClick={(e) => setFilter(filter => 2)}>Finished</button>
			</div>
			<ul className="list">
				{items.map((todo, index) =>
					<Todo 
						key ={index} 
						filter={filter} 
						todo={todo} 
						handleCompleted={(e) => handleCompleted(e, todo.id, !todo.completed)} 
						handleRemove={(e) => handleRemove(e, todo.id)} 
					/>
				)}
			</ul>
		</div>
	);
} 

export default TodosBox;