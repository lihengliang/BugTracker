require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const idxRouter = require('./routes/index.router');
const app = express();

// middleware
app.use(bodyParser.json())
app.use(cors());
app.use('/api', idxRouter);

// error handler
app.use((error, req, res, next) => {
    let errors = [];
    if (error.code = 11000) {
        errors.push('Email already exists');
    }
    if (error.name === 'ValidationError') {
        Object.keys(error.errors).forEach(key => errors.push(error.errors[key].message));
    }
    res.status(422).send(errors);
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`));

