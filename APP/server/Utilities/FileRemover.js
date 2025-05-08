const cloudinary = require('cloudinary').v2;


exports.fileRemoveFromCloudinary = async(fileUrl,filetype) => {

    //make up the options specify file type
    const options = {
        resource_type : filetype,
    };

    //take out the public id from link
    const publicIdParts = fileUrl?.split('/upload/')?.at(1)?.split('.')?.at(0)?.split('/');
    const publicId = (publicIdParts[1] + '/' + publicIdParts[2])?.trim();

    //delete the file
    return await cloudinary.uploader.destroy(publicId,options);
}