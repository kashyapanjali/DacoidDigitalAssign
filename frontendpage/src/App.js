import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import RedirectPage from "./components/RedirectPage";
import "./App.css";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLogin = () => {
		setIsAuthenticated(true);
	};

	return (
		<Router>
			<div className='app'>
				<Routes>
					<Route
						path='/login'
						element={
							isAuthenticated ?
								<Navigate to='/dashboard' />
							:	<Login onLogin={handleLogin} />
						}
					/>
					<Route
						path='/dashboard'
						element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' />}
					/>
					<Route
						path='/:shortCode'
						element={<RedirectPage />}
					/>
					<Route
						path='/'
						element={
							<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
