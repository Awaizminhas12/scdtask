const Bookings = require('./bookingmodel');
const axio = require('axios');

exports.createBooking = async (req, res) => {
    try {
        const { bookingId,userId, carId, startDate, endDate } = req.body;

        const userResponse = await axio.get(`http://localhost:5002/api/users/${userId}`);
        const user = userResponse.data;

        if (user.activeBookings >= user.maxBookings) {
            return res.status(400).json({ message: 'User has reached the booking limit' });
        }

        const carResponse = await axio.get(`http://localhost:5001/api/cars/${carId}`);
        const car = carResponse.data;

        if (!car.isAvailable) {
            return res.status(400).json({ message: 'Car is not available' });
        }

        const booking = new Bookings({bookingId, userId, carId, startDate, endDate });
        await booking.save();
        await axio.put(`http://localhost:5002/api/users/${userId}`, {
            activeBookings: user.activeBookings + 1
        });

        await axio.put(`http://localhost:5001/api/cars/${carId}`, {
            isAvailable: false
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Bookings.findOne({ bookingsId: req.params.bookingsId }); 

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateBooking = async (req, res) => {
    try {
        
        const { startDate, endDate } = req.body;

        const booking = await Bookings.findOne({ bookingsId: req.params.bookingsId }); 
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.status === 'canceled') {
            return res.status(400).json({ message: 'Cannot update a canceled booking' });
        }

        booking.startDate = startDate || booking.startDate;
        booking.endDate = endDate || booking.endDate;
        await booking.save();

        res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
