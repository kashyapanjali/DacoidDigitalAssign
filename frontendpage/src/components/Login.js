import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// For demo purposes, hardcoded credentials
		if (email === "intern@dacoid.com" && password === "Test123") {
			// In a real app, you would fetch JWT and save to localStorage
			localStorage.setItem("token", "demo-jwt-token");
			onLogin();
		} else {
			setError("Invalid credentials. Please try again.");
		}
	};

	return (
		<div className='login-container'>
			<div className='login-form-container'>
				<h2>Link Analytics Dashboard</h2>
				<form
					className='login-form'
					onSubmit={handleSubmit}>
					{error && <div className='error-message'>{error}</div>}
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Enter your email'
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Enter your password'
							required
						/>
					</div>
					<button
						type='submit'
						className='login-button'>
						Login
					</button>
				</form>
				<div className='test-credentials'>
					<p>Test Credentials:</p>
					<p>Email: intern@dacoid.com</p>
					<p>Password: Test123</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
