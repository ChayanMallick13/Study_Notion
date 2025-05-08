const mongoose = require('mongoose');


const ScheduledDeletionsSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:'true',
        },
        scheduledTime:{
            type:Date,
            required:'true',
        },
    }
);


module.exports = mongoose.model("ScheduledDeletions",ScheduledDeletionsSchema);