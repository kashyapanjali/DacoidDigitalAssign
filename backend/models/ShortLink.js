const mongoose = require("mongoose");

const shortLinkSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	originalUrl: String,
	shortCode: String,
	createdAt: { type: Date, default: Date.now },
	expiresAt: Date,
	clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model("ShortLink", shortLinkSchema);
