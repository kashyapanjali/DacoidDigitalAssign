const ShortLink = require("../models/ShortLink");
const ClickLog = require("../models/ClickLog");

function generateCode(length = 6) {
	return Math.random()
		.toString(36)
		.substring(2, 2 + length);
}

exports.createLink = async (req, res) => {
	const { originalUrl, customAlias, expiresAt } = req.body;
	const userId = req.userId;

	const shortCode = customAlias || generateCode();

	const newLink = new ShortLink({
		userId,
		originalUrl,
		shortCode,
		expiresAt: expiresAt ? new Date(expiresAt) : null,
	});

	await newLink.save();
	res.json({ shortUrl: `${req.headers.origin}/${shortCode}` });
};

exports.getUserLinks = async (req, res) => {
	const links = await ShortLink.find({ userId: req.userId });
	res.json(links);
};

exports.getStats = async (req, res) => {
	const { code } = req.params;
	const logs = await ClickLog.find({ shortCode: code });

	const clicksOverTime = {};
	const deviceStats = {};

	logs.forEach((log) => {
		const date = log.timestamp.toISOString().split("T")[0];
		clicksOverTime[date] = (clicksOverTime[date] || 0) + 1;
		deviceStats[log.device] = (deviceStats[log.device] || 0) + 1;
	});

	res.json({ clicksOverTime, deviceStats });
};
