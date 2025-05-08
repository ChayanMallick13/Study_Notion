const express = require('express');

const paymentrouter = express.Router();

//middlewares

const {auth,isAdmin,isInstructor,isStudent} = require('../MiddleWares/Auth');


//controllers

const {capturePayment,verifySignature,sendPurchaseCompleteMail} = require('../Controllers/Payments');




// ---> routes

paymentrouter.post('/capturePayment',auth,isStudent,capturePayment);
paymentrouter.post('/verifySignature',auth,verifySignature);
paymentrouter.post('/sendPurchaseMail',auth,sendPurchaseCompleteMail);




module.exports = paymentrouter;