
const User = require('./usermodel');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log("jhvj");
        res.status(400).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserBookings = async (req, res) => {
    try {
        const { activeBookings } = req.body;
        const user = await User.findOneAndUpdate(
            { userId: req.params.userId },
            { activeBookings },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};