// const {  toast } = require("react-hot-toast");
const { apiConnector } = require("../apiconnector")
const { geminiLinks } = require("../apis");
const { addBotReply, addUserText, toggleBotTyping } = require("../../reducer/Slices/ChatBotSlice");




exports.getGeminiResponse = (userPrompt) => {
    return async(dispatch) => {
        dispatch(toggleBotTyping());
        dispatch(addUserText(userPrompt));
        const body = {
            body:{
                "contents": [{
                    "parts":[{"text":userPrompt}]
                }],
            },
            headers:{
                "Content-Type":"application/json",
            }
        }
        await   apiConnector("POST",geminiLinks.GEMINI_API_LINK_BACKEND,body).then(
            (res) => {
                const chat_answers = res.data.data.candidates[0].content.parts;
                dispatch(addBotReply(chat_answers));
            }
        ).catch(
            (err) => {
                console.error('Some Error Occurred');
                //toast.error('Some Problem With Bot Try Again Later');
            }
        );
        dispatch(toggleBotTyping());
    }
}