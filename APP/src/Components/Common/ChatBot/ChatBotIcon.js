import React from 'react'
import BotLogo from '../../../assets/Logo/BotLogo.png';
import { useDispatch } from 'react-redux';
import { toggleShowChat } from '../../../reducer/Slices/ChatBotSlice';

const ChatBotIcon = () => {
    const dispatch = useDispatch();
    function showCharHandler(){
        dispatch(toggleShowChat());
    }
  return (
    <button className='fixed w-[80px] h-[80px] bottom-3 right-3 cursor-pointer z-20'
    onClick={showCharHandler}
    >
      <img
        alt='chatBoxLogo'
        src={BotLogo}
      />
    </button>
  )
}

export default ChatBotIcon
