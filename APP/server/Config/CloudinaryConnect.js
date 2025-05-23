const cloudinary = require('cloudinary').v2;

require('dotenv').config();

const cloudinaryConnect = async() => {
    try{

        cloudinary.config(
            {
                cloud_name:process.env.CLOUD_NAME,
                api_key:process.env.API_KEY,
                api_secret:process.env.API_SECRET
            }
        );

        console.log('Cloudinary Connect Successfull');

    }catch(err){
        console.log('Error in Connecing To Cloudinary');
        console.error(err);
        process.exit(1);
    }
}
module.exports = cloudinaryConnect;