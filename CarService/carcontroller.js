const Car = require('./carmodel');

exports.createCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCar = async (req, res) => {
    try {
        const car = await Car.findOne({ carId: req.params.carId });
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateCarAvailability = async (req, res) => {
    try {
        const { carId } = req.params;
        const { isAvailable } = req.body;

        const car = await Car.findOne({ carId });
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        car.isAvailable = isAvailable;
        await car.save();

        res.status(200).json({ message: 'Car availability updated successfully', car });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




