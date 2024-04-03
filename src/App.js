import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import "./App.css";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Home from "./components/Home";

function App() {
	return (
		<div className="App">
			<h1 className="headline">All Users' Profiles </h1>
			<h3>Click on the header of Age, Job Title, Employer, or City to sort </h3>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/create"
						element={<Create />}
					/>
					<Route
						path="/edit"
						element={<Edit />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
