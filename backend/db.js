const mongoose = require('mongoose');


const connectDB = async (mongoUri) => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connectd ')
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

};
module.exports = connectDB

