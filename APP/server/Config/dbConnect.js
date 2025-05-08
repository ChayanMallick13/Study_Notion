const mongoose = require('mongoose');

require('dotenv').config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL).then(
        () => {
            console.log('Database Connection Successfull');
        }
    ).catch(
        (err) => {
            console.log('Error In Connecting To Database');
            console.error(err);
            process.exit(1);
        }
    )
};