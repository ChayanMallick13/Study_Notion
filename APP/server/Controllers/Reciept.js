const Reciept = require("../Models/Reciept");



exports.getReieptDetails = async (req, res) => {
    try {
        const {userId} = req.user;

        if(!userId){
            return res.status(404).json({
                 success: false,
                 message: 'User Not Found Or Some Error Occurred',
            });
        }

        const recieptDetails = await Reciept.find({userId}).populate("courses").exec();


        return res.status(200).json({
             success: true,
             message: 'Data Fetched Successfully',
             recieptDetails,
        });
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Some Error Occurred In getting Reciept Details',
        });
    }
};