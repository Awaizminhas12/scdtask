const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./userrouter');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);


mongoose.connect('mongodb://localhost:27017/car_rental')
    .then(() => console.log('user Service DB Connected'))
    .catch(err => console.log(err));


app.use('/api', userRoutes);

const PORT = 5002;
app.listen(PORT, () => {
    console.log(`user Service running on port ${PORT}`);
});
