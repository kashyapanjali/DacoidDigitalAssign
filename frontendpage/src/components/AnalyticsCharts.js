// components/AnalyticsCharts.js
import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import "./AnalyticsCharts.css";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
);

const AnalyticsCharts = ({ link }) => {
	const [timeData, setTimeData] = useState(null);
	const [deviceData, setDeviceData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		// Simulate API call to get analytics data
		setTimeout(() => {
			// Mock time data - last 7 days
			const dates = [];
			const clicksData = [];
			const now = new Date();

			for (let i = 6; i >= 0; i--) {
				const date = new Date(now);
				date.setDate(date.getDate() - i);
				dates.push(
					date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
				);
				// Generate random click count based on total clicks
				const randomClicks =
					Math.floor(Math.random() * (link.totalClicks / 10)) + 1;
				clicksData.push(randomClicks);
			}

			setTimeData({
				labels: dates,
				datasets: [
					{
						label: "Clicks",
						data: clicksData,
						borderColor: "rgba(54, 162, 235, 1)",
						backgroundColor: "rgba(54, 162, 235, 0.2)",
						tension: 0.3,
					},
				],
			});

			// Mock device data
			setDeviceData({
				labels: ["Desktop", "Mobile", "Tablet"],
				datasets: [
					{
						data: [
							Math.floor(link.totalClicks * 0.55),
							Math.floor(link.totalClicks * 0.35),
							Math.floor(link.totalClicks * 0.1),
						],
						backgroundColor: [
							"rgba(54, 162, 235, 0.6)",
							"rgba(255, 99, 132, 0.6)",
							"rgba(255, 206, 86, 0.6)",
						],
						borderColor: [
							"rgba(54, 162, 235, 1)",
							"rgba(255, 99, 132, 1)",
							"rgba(255, 206, 86, 1)",
						],
						borderWidth: 1,
					},
				],
			});

			setLoading(false);
		}, 1000);
	}, [link]);

	if (loading) {
		return (
			<div className='analytics-loading'>
				<div className='spinner'></div>
				<p>Loading analytics data...</p>
			</div>
		);
	}

	return (
		<div className='analytics-container'>
			<h2>Analytics for {link.shortUrl.split("/").pop()}</h2>

			<div className='analytics-summary'>
				<div className='summary-card'>
					<h3>Total Clicks</h3>
					<p className='summary-value'>{link.totalClicks}</p>
				</div>
				<div className='summary-card'>
					<h3>Active Since</h3>
					<p className='summary-value'>
						{new Date(link.createdDate).toLocaleDateString()}
					</p>
				</div>
				<div className='summary-card'>
					<h3>Status</h3>
					<p className={`summary-value status-${link.status.toLowerCase()}`}>
						{link.status}
					</p>
				</div>
			</div>

			<div className='charts-container'>
				<div className='chart-card'>
					<h3>Clicks Over Time</h3>
					<div className='chart-wrapper'>
						<Line
							data={timeData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								plugins: {
									legend: {
										position: "top",
									},
									title: {
										display: true,
										text: "Clicks - Last 7 Days",
									},
								},
								scales: {
									y: {
										beginAtZero: true,
										ticks: {
											precision: 0,
										},
									},
								},
							}}
						/>
					</div>
				</div>

				<div className='chart-card'>
					<h3>Device Breakdown</h3>
					<div className='chart-wrapper'>
						<Pie
							data={deviceData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								plugins: {
									legend: {
										position: "right",
									},
									title: {
										display: true,
										text: "Clicks by Device Type",
									},
								},
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsCharts;
