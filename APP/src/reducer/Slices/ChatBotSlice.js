import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    chatBox:[],
    showChatBox:false,
    isBotTyping:false,
}



const chatBoxSlice = createSlice({
    name:"chatBox",
    initialState,
    reducers:{
        toggleShowChat(state){
            state.showChatBox = !state.showChatBox;
        },
        closeChat(state){
            state.showChatBox = false;
        },
        toggleBotTyping(state){
            state.isBotTyping = !state.isBotTyping;
        },
        addUserText(state,action){
            const userText = action.payload;
            const text = {
                text:userText,
                isbot:false,
            }
            state.chatBox.push(text);
        },
        addBotReply(state,action){
            const botReplys = action.payload;
            const botTexts = botReplys.map(
                (ele) => {
                    return {
                        text:ele.text,
                        isbot:true,
                    }
                }
            );
            state.chatBox = [...state.chatBox,...botTexts];
        }

    }
});


export const {addBotReply,addUserText,toggleShowChat,toggleBotTyping,closeChat} = chatBoxSlice.actions;

export default chatBoxSlice.reducer;