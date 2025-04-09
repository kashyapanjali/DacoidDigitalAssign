import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RedirectPage.css";

const RedirectPage = () => {
	const { shortCode } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	useEffect(() => {
		// Simulate API call to get the original URL
		const fetchOriginalUrl = async () => {
			try {
				// In a real app, this would be an API call to your backend
				// For demonstration, we'll simulate a delay and redirect to Google
				await new Promise((resolve) => setTimeout(resolve, 1500));

				// Simulate 10% chance of expired or not found link
				if (Math.random() < 0.1) {
					setError("This link has expired or doesn't exist.");
					return;
				}

				// Mock successful redirect
				window.location.href = "https://www.google.com";
			} catch (error) {
				setError("An error occurred while redirecting.");
			}
		};

		fetchOriginalUrl();
	}, [shortCode, navigate]);

	return (
		<div className='redirect-container'>
			{error ?
				<div className='redirect-error'>
					<h2>Oops!</h2>
					<p>{error}</p>
					<button onClick={() => navigate("/")}>Go to Homepage</button>
				</div>
			:	<div className='redirect-loader'>
					<div className='loader'></div>
					<p>Redirecting you to the destination...</p>
					<p className='short-code'>Link: {shortCode}</p>
				</div>
			}
		</div>
	);
};

export default RedirectPage;
