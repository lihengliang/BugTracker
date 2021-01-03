const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (error) => {
    if(!error) {
        console.log('MongoDB connected');
    } else {
        console.log(JSON.stringify(error, undefined, 2));
    }
});

