const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    carId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'canceled'], default: 'active' }
});

module.exports = mongoose.model('Booking', BookingSchema);
