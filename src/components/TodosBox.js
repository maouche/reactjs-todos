import { useState, useEffect, useReducer } from "react";
import Todo from "./Todo";
import reducer from "./reducer";
import axios from "axios";

function TodosBox () {
	const [input, setInput] = useState("");
	const [filter, setFilter] = useState(0);
	const [items, dispatch] = useReducer(reducer, [])

	useEffect(() => {
	    getItems()
	}, [])

	function getItems() {
		axios({
		  method: 'get',
		  url: 'https://shy-red-cougar-sari.cyclic.app:4000/api/v1/todos/'
		})
		.then(function (response) {
		  dispatch({type: "fetch", items: response.data});
		});
  }

	const handleChange = function (e) {
		setInput(input => e.target.value)
	}

	const handleSubmit = function (e) {
		e.preventDefault();
		if ( input !== "") {
			const item = {"title": input, completed: false, created_at: Date.now()}
			axios({
			  method: 'post',
			  url: 'https://shy-red-cougar-sari.cyclic.app:4000/api/v1/todos/',
			  data: item
			})
			.then(function (response) {
			  dispatch({type: "add", item: response.data})
			  setInput(input => "")
			});
		}
	}

	const handleRemove = function (e, id) {
		e.preventDefault()
		axios({
		  method: 'delete',
		  url: 'https://shy-red-cougar-sari.cyclic.app:4000/api/v1/todos/',
		  data: {id}
		})
		.then(function (response) {
		  dispatch({type: "remove", id: id})
		});
	}

	const handleCompleted = function (e, item) {
		e.preventDefault();
		const todo =  JSON.parse('{"id":"' + item.id + '", "title":"' + item.title + '", "completed": ' + !item.completed + '}');
		axios({
		  method: 'put',
		  url: 'https://shy-red-cougar-sari.cyclic.app:4000/api/v1/todos/',
		  data: todo
		})
		.then(function (response) {
		  dispatch({type: "update", item: {id: todo.id, completed: todo.completed} })
		});
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
						handleCompleted={(e) => handleCompleted(e, todo)} 
						handleRemove={(e) => handleRemove(e, todo.id)} 
					/>
				)}
			</ul>
		</div>
	);
} 

export default TodosBox;