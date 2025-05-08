const cloudinary = require('cloudinary').v2;
cloudinary.config(
    {
        secure:true,
    }
);

exports.UploadFileToCloudinary = async(file,folder,height=null,width=null,quality=null) => {
    const options = {
        folder,
        resource_type:'auto',
    }

    if(height){
        options.height = height;
    }
    if(width){
        options.width = width;
    }
    if(quality){
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(
        file.tempFilePath,
        options
    );
};
