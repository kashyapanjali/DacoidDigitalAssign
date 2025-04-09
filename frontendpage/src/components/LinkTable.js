import React from "react";
import QRCodeGenerator from "./QRCodeGenerator";
import "./LinkTable.css";
import { useState } from "react";

const LinkTable = ({ links, onSelectLink, selectedLinkId }) => {
	const [showQRCode, setShowQRCode] = useState(null);

	return (
		<div className='link-table-container'>
			<h2>Your Links</h2>
			{links.length === 0 ?
				<div className='no-links'>
					<p>You haven't created any links yet.</p>
				</div>
			:	<div className='table-responsive'>
					<table className='link-table'>
						<thead>
							<tr>
								<th>Original URL</th>
								<th>Short URL</th>
								<th>Clicks</th>
								<th>Created Date</th>
								<th>Expiration</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{links.map((link) => (
								<tr
									key={link.id}
									onClick={() => onSelectLink(link)}
									className={selectedLinkId === link.id ? "selected-row" : ""}>
									<td
										className='url-cell'
										title={link.originalUrl}>
										{link.originalUrl.length > 30 ?
											`${link.originalUrl.substring(0, 30)}...`
										:	link.originalUrl}
									</td>
									<td>
										<a
											href={link.shortUrl}
											target='_blank'
											rel='noopener noreferrer'>
											{link.shortUrl.split("/").pop()}
										</a>
									</td>
									<td>{link.totalClicks}</td>
									<td>{link.createdDate}</td>
									<td>{link.expirationDate || "Never"}</td>
									<td>
										<span
											className={`status-badge ${link.status.toLowerCase()}`}>
											{link.status}
										</span>
									</td>
									<td>
										<button
											className='qr-button'
											onClick={(e) => {
												e.stopPropagation();
												setShowQRCode(link.id === showQRCode ? null : link.id);
											}}>
											QR Code
										</button>
										{showQRCode === link.id && (
											<div className='qr-popup'>
												<QRCodeGenerator url={link.shortUrl} />
												<button
													className='close-qr-button'
													onClick={(e) => {
														e.stopPropagation();
														setShowQRCode(null);
													}}>
													Close
												</button>
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			}
		</div>
	);
};

export default LinkTable;
