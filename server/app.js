require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const idxRouter = require('./routes/index.router');
const app = express();

// middleware
app.use(bodyParser.json())
app.use(cors());
app.use('/api', idxRouter);
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// start server
app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`));

