const express = require('express');
const cors = require('cors');
const app = express();
const mainRoutes = require('./routes/index');


app.use(cors({
    origin: ['https://sunny-pos.vercel.app','https://posinventory.in', 'http://localhost:5173'], // your React frontend URL
    // origin: ['http://localhost:5173'], // your React frontend URL
    credentials: true
}));
app.use(express.json());
app.use('/api', mainRoutes);

module.exports = app;
