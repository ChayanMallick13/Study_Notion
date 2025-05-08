const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
        },

        description: {
            type:String,
            trim:true,
        },

        course:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
            required:true,
        }],
    }
);



module.exports = mongoose.model("Category",CategorySchema);