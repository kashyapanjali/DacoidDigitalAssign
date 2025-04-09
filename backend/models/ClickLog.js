const mongoose = require("mongoose");

const clickLogSchema = new mongoose.Schema({
	shortCode: String,
	timestamp: { type: Date, default: Date.now },
	ip: String,
	device: String,
	browser: String,
});

module.exports = mongoose.model("ClickLog", clickLogSchema);
