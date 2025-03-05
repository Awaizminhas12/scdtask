

const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    carId: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    location: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Car', CarSchema);