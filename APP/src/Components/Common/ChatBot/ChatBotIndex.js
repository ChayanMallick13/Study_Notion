import ChatBotMessageBox from './ChatBotMessageBox';
import ChatBotIcon from './ChatBotIcon';
import {  useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ChatBotIndex = () => {

    const {showChatBox} = useSelector(state => state.chatBox);

    const allowedPaths = [
        '/',
        '/about',
        '/contact',
        '/course',
        '/dashboard',
        '/catalog'
    ];

    const location = useLocation();


    function showBot(){
        const url = location.pathname;
        if(allowedPaths.includes(url)){
            return true;
        }
        let allowed = false;
        allowedPaths.forEach(ele => {
            if(url.includes(ele)&&ele!=='/'){
                allowed = true;
            }
        });
        return allowed;
    }

    

  return (
    <div
    >
        {
            (showBot())&&((showChatBox)?(<ChatBotMessageBox/>):(<ChatBotIcon/>))
        }
    </div>
  )
}

export default ChatBotIndex;
