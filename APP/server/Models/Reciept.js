const mongoose = require('mongoose');


const RecieptSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        amount:{
            type:String,
            required:true,
            trim:true,
        },
        orderId:{
            type:String,
            required:true,
            trim:true,
        },
        currency:{
            type:String,
            required:true,
            trim:true,
        },
        method:{
            type:String,
            required:true,
            trim:true,
        },
        paymentId:{
            type:String,
            required:true,
            trim:true,
        },
        bank:{
            type:String,
            required:true,
            trim:true,
        },
        courses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }],
        createdAt:{
            type:String,
            required:true,
            trim:true,
        },
    }
);


module.exports = mongoose.model("Reciept",RecieptSchema);