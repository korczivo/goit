const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRouter = require('./api');

require('dotenv').config();

const { DB_HOST: urlDb } = process.env;

const connection = mongoose.connect(urlDb);

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).json({ message: `Not found - ${req.path}` });
})

app.use((err, req, res, next) => {
    if(err.name === 'ValidationError'){
        return res.status(400).json({ message: err.message });
    } else {
        res.status(500).json({ message: err.message || 'Something went wrong' });
    }
})

const startServer = async () => {
    try{
        await connection;
        console.log('Database connected');
        app.listen(8000, () => {
            console.log('Server started on http://localhost:8000');
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

startServer();