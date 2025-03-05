const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./carrouter');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/car_rental')
    .then(() => console.log('Car Service DB Connected'))
    .catch(err => console.log(err));


app.use('/api', carRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Car Service running on port ${PORT}`);
});
