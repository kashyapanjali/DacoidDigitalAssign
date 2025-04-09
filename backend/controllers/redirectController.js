const ShortLink = require("../models/ShortLink");
const ClickLog = require("../models/ClickLog");
const useragent = require("user-agent");

exports.redirect = async (req, res) => {
	const { code } = req.params;
	const link = await ShortLink.findOne({ shortCode: code });

	if (!link) return res.status(404).send("Link not found");

	if (link.expiresAt && new Date() > link.expiresAt) {
		return res.status(410).send("Link expired");
	}

	link.clicks += 1;
	await link.save();

	const ua = useragent.parse(req.headers["user-agent"]);

	const log = new ClickLog({
		shortCode: code,
		ip: req.ip,
		device: ua.device.family,
		browser: ua.family,
	});

	log.save(); // async

	res.redirect(link.originalUrl);
};
