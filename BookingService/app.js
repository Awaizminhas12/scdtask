const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./bookingrouter');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/car_rental')
    .then(() => console.log('booking Service DB Connected'))
    .catch(err => console.log(err));


app.use('/api', bookingRoutes);

const PORT = 5003;
app.listen(PORT, () => {
    console.log(`booking Service running on port ${PORT}`);
});
