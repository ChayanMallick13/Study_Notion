const express = require('express');

const paymentrouter = express.Router();

//middlewares

const {auth,isAdmin,isInstructor,isStudent} = require('../MiddleWares/Auth');


//controllers

const {capturePayment,verifySignature,sendPurchaseCompleteMail} = require('../Controllers/Payments');
const { getReieptDetails } = require('../Controllers/Reciept');




// ---> routes

paymentrouter.post('/capturePayment',auth,isStudent,capturePayment);
paymentrouter.post('/verifySignature',auth,verifySignature);
paymentrouter.post('/sendPurchaseMail',auth,sendPurchaseCompleteMail);

//payment detials routes 
paymentrouter.get('/getUserPaymentHistory',auth,getReieptDetails);




module.exports = paymentrouter;