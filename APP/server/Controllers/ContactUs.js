const {mailSender} = require('../Utilities/NodemailerConfig');
const {getUserConfirmationEmailTemplate} = require('../mail/templates/FormSubmissionConfirm');
const {getServerSupportTeamEmailTemplate} = require('../mail/templates/UserResponseToSupportMail');

require('dotenv').config();

exports.contactUsHandler = async (req, res) => {
    try {
        
        const {firstName,lastName,email,phoneNumber,message} = req.body;

        //send the user's response to support team
        const serverSupportInfo = await mailSender(process.env.SUPPORT_TEAM_EMAIL,
            `New Query from ${firstName} ${lastName} – Action Needed | Study Notion Support Team`
            ,getServerSupportTeamEmailTemplate(firstName,lastName,email,phoneNumber,message)
        );

        //send a confirmation mail to user thats users response has been recieved ans problem will be solved
        const userMailInfo = await mailSender(email,`We’ve Received Your Message, ${firstName}! – Study Notion Team Will Get Back to You Soon`,
            getUserConfirmationEmailTemplate(firstName,lastName,email,phoneNumber,message)
        );

        console.log(serverSupportInfo,userMailInfo);

        //return a successfull response 
        return res.status(200).json({
             success: true,
             message: 'User Query Recieved Successfully',
        });
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error in Contacting Us',
        });
    }
};