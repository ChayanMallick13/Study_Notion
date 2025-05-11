const axios = require('axios');
require('dotenv').config();

exports.callGeminiApi = async (req, res) => {
    try {
        const {body,headers} = req.body;

        if(!body || !headers){
            return res.status(404).json({
                 success: false,
                 message: 'No MEssage Found',
            });
        }

        const response = await axios.post(
            process.env.GEMINI_API_LINK,
            body,
            headers
        )

        //console.log(response.data);


        return res.status(200).json({
             success: true,
             message: 'Message Got Successfully',
             data:response.data,
        });
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'some Error Occured in Gemini Contro',
        });
    }
};