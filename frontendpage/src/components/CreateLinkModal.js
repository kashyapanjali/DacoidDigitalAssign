import React, { useState } from "react";
import "./CreateLinkModal.css";

const CreateLinkModal = ({ onClose, onSubmit }) => {
	const [originalUrl, setOriginalUrl] = useState("");
	const [customAlias, setCustomAlias] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		// Simple validation
		if (!originalUrl) {
			setError("Please enter a URL to shorten");
			return;
		}

		// Make sure URL has http:// or https://
		let formattedUrl = originalUrl;
		if (
			!formattedUrl.startsWith("http://") &&
			!formattedUrl.startsWith("https://")
		) {
			formattedUrl = "https://" + formattedUrl;
		}

		onSubmit({
			originalUrl: formattedUrl,
			customAlias: customAlias || null,
			expirationDate: expirationDate || null,
		});
	};

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<div className='modal-header'>
					<h2>Create Short Link</h2>
					<button
						className='close-button'
						onClick={onClose}>
						&times;
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					{error && <div className='error-message'>{error}</div>}

					<div className='form-group'>
						<label htmlFor='originalUrl'>Original URL *</label>
						<input
							type='text'
							id='originalUrl'
							value={originalUrl}
							onChange={(e) => setOriginalUrl(e.target.value)}
							placeholder='https://example.com/your/long/url'
							required
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='customAlias'>Custom Alias (Optional)</label>
						<div className='input-with-prefix'>
							<span className='input-prefix'>yourdomain.com/</span>
							<input
								type='text'
								id='customAlias'
								value={customAlias}
								onChange={(e) => setCustomAlias(e.target.value)}
								placeholder='e.g., my-link'
							/>
						</div>
						<small>Leave blank for auto-generated short code</small>
					</div>

					<div className='form-group'>
						<label htmlFor='expirationDate'>Expiration Date (Optional)</label>
						<input
							type='date'
							id='expirationDate'
							value={expirationDate}
							onChange={(e) => setExpirationDate(e.target.value)}
							min={new Date().toISOString().split("T")[0]}
						/>
					</div>

					<div className='modal-footer'>
						<button
							type='button'
							className='cancel-button'
							onClick={onClose}>
							Cancel
						</button>
						<button
							type='submit'
							className='submit-button'>
							Create Link
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateLinkModal;
