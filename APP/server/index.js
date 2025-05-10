const express = require('express');

const app = express();

//middlewares to extract data
app.use(express.json());

const cookie_parser = require('cookie-parser');
app.use(cookie_parser());

const fileupload = require('express-fileupload');
app.use(fileupload(
    {
        useTempFiles:true,
        tempFileDir:'/tmp'
    }
));

require('dotenv').config();

//make the backend support frontend requests
const cors = require('cors');
app.use(
    cors({
        origin:(process.env.NODE_ENV==='production')?(process.env.FRONT_END_BASE_URL):("http://localhost:3000"),
        credentials:true,
    })
);


//mount the api's and get the router
const courserouter = require('./Routes/courseroutes');
const profilerouter = require('./Routes/profileRoutes');
const paymentrouter = require('./Routes/paymentRoutes');
const userrouter = require('./Routes/userRoutes');
app.use('/api/v1/auth',userrouter);
app.use('/api/v1/profile',profilerouter);
app.use('/api/v1/course',courserouter);
app.use('/api/v1/payment',paymentrouter);

//connect to the database 
const {dbConnect} = require('./Config/dbConnect');
dbConnect();

//connect to cloudinary
const cloudinaryConnect = require('./Config/CloudinaryConnect');
cloudinaryConnect();


//default route
app.get('/',(req,res) => {
    return res.json({
        success:true,
        message:"Server Running Successfully.....",
    })
});


//make the backend listen to some port 
const PORT = process.env.PORT || 4000 ;

app.listen(PORT,() => {
    console.log('Server is Started al Port Number ',PORT);
});