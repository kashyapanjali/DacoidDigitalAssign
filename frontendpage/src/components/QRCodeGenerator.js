import React from "react";
import "./QRCodeGenerator.css";

const QRCodeGenerator = ({ url }) => {
	// This is a mock QR code. In a real application, you would use a library like 'qrcode.react'
	// For demonstration purposes, we're showing a placeholder
	return (
		<div className='qr-code-container'>
			<h3>QR Code for Short Link</h3>
			<div className='qr-code-placeholder'>
				<div className='qr-mock'>
					<div className='qr-pattern top-left'></div>
					<div className='qr-pattern top-right'></div>
					<div className='qr-pattern bottom-left'></div>
					<div className='qr-inner'></div>
				</div>
			</div>
			<p className='qr-url'>{url}</p>
			<button className='download-button'>Download QR Code</button>
		</div>
	);
};

export default QRCodeGenerator;
