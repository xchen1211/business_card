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
import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

function App({ signOut, user }) {
	return (
		<div className="App">
		
			<button onClick={signOut} style={{ marginTop: '10px' }}>Sign out</button>
			<Router>
				<Routes>
					<Route path="/" element={<Home user={user} />} />
		
					<Route
						path="/create"
						element={<Create user={user}/>}
					/>
					<Route
						path="/edit"
						element={<Edit user={user}/>}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default withAuthenticator(App);
