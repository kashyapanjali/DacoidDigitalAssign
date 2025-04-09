const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existing = await User.findOne({ email });
		if (existing)
			return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({ email, password: hashedPassword });
		const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(201).json({ token, email: newUser.email });
	} catch (err) {
		res.status(500).json({ message: "Error registering user" });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) return res.status(401).json({ message: "Invalid credentials" });

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	res.json({ token, email: user.email });
};
