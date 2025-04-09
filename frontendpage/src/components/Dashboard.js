// components/Dashboard.js
import React, { useState, useEffect } from "react";
import CreateLinkModal from "./CreateLinkModal";
import LinkTable from "./LinkTable";
import AnalyticsCharts from "./AnalyticsCharts";
import "./Dashboard.css";

const Dashboard = () => {
	const [showModal, setShowModal] = useState(false);
	const [links, setLinks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedLink, setSelectedLink] = useState(null);
	const itemsPerPage = 5;

	useEffect(() => {
		// Mock data for demo purposes
		setTimeout(() => {
			const mockLinks = [
				{
					id: "1",
					originalUrl:
						"https://www.example.com/very/long/url/that/needs/shortening",
					shortUrl: "https://yourdomain.com/x9kQ2A",
					totalClicks: 145,
					createdDate: "2025-03-01",
					expirationDate: "2025-05-01",
					status: "Active",
				},
				{
					id: "2",
					originalUrl: "https://www.anotherexample.com/path/to/resource",
					shortUrl: "https://yourdomain.com/aB3cD9",
					totalClicks: 89,
					createdDate: "2025-03-05",
					expirationDate: null,
					status: "Active",
				},
				{
					id: "3",
					originalUrl: "https://www.test.com/test-page",
					shortUrl: "https://yourdomain.com/test",
					totalClicks: 246,
					createdDate: "2025-02-15",
					expirationDate: "2025-03-15",
					status: "Expired",
				},
				{
					id: "4",
					originalUrl: "https://www.google.com",
					shortUrl: "https://yourdomain.com/goog",
					totalClicks: 532,
					createdDate: "2025-02-20",
					expirationDate: null,
					status: "Active",
				},
				{
					id: "5",
					originalUrl: "https://www.github.com/repository/example",
					shortUrl: "https://yourdomain.com/gh123",
					totalClicks: 74,
					createdDate: "2025-03-10",
					expirationDate: "2025-06-10",
					status: "Active",
				},
				{
					id: "6",
					originalUrl: "https://www.docs.com/document",
					shortUrl: "https://yourdomain.com/docs1",
					totalClicks: 112,
					createdDate: "2025-02-28",
					expirationDate: null,
					status: "Active",
				},
			];
			setLinks(mockLinks);
			setSelectedLink(mockLinks[0]);
			setLoading(false);
		}, 1000);
	}, []);

	const handleCreateLink = (linkData) => {
		// In a real app, this would be an API call
		const newLink = {
			id: Date.now().toString(),
			originalUrl: linkData.originalUrl,
			shortUrl: `https://yourdomain.com/${linkData.customAlias || Math.random().toString(36).substring(2, 8)}`,
			totalClicks: 0,
			createdDate: new Date().toISOString().split("T")[0],
			expirationDate: linkData.expirationDate || null,
			status: "Active",
		};

		setLinks([newLink, ...links]);
		setShowModal(false);
	};

	const filteredLinks = links.filter(
		(link) =>
			link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
			link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentLinks = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/login";
	};

	const handleLinkSelect = (link) => {
		setSelectedLink(link);
	};

	return (
		<div className='dashboard'>
			<header className='dashboard-header'>
				<h1>Link Analytics Dashboard</h1>
				<div className='header-right'>
					<button
						onClick={() => setShowModal(true)}
						className='create-link-btn'>
						Create Short Link
					</button>
					<button
						onClick={handleLogout}
						className='logout-btn'>
						Logout
					</button>
				</div>
			</header>

			<div className='dashboard-content'>
				<div className='search-container'>
					<input
						type='text'
						placeholder='Search links...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='search-input'
					/>
				</div>

				{loading ?
					<div className='loading-spinner'>
						<div className='spinner'></div>
						<p>Loading your links...</p>
					</div>
				:	<>
						<LinkTable
							links={currentLinks}
							onSelectLink={handleLinkSelect}
							selectedLinkId={selectedLink?.id}
						/>

						<div className='pagination'>
							<button
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								className='pagination-btn'>
								Previous
							</button>
							<span className='page-info'>
								Page {currentPage} of {totalPages || 1}
							</span>
							<button
								onClick={() =>
									setCurrentPage((prev) =>
										prev < totalPages ? prev + 1 : prev
									)
								}
								disabled={currentPage === totalPages || totalPages === 0}
								className='pagination-btn'>
								Next
							</button>
						</div>

						{selectedLink && <AnalyticsCharts link={selectedLink} />}
					</>
				}
			</div>

			{showModal && (
				<CreateLinkModal
					onClose={() => setShowModal(false)}
					onSubmit={handleCreateLink}
				/>
			)}
		</div>
	);
};

export default Dashboard;
