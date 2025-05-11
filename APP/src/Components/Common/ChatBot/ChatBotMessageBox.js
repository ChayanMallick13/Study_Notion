import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImCross } from "react-icons/im";
import { toggleShowChat } from '../../../reducer/Slices/ChatBotSlice';
import { IoSend } from "react-icons/io5";
import { getGeminiResponse } from '../../../Services/Operations/Gemini_Api';
import ReactMarkdown from 'react-markdown'


const ChatBotMessageBox = () => {

    function getRand() {
        return Math.floor(155 * Math.random());
    }

    const [color, setColor] = useState(randColor());
    const [userMessage, setuserMessage] = useState('');
    const { chatBox, isBotTyping } = useSelector(state => state.chatBox);
    const chatBoxRef = useRef();
    


    function randColor() {
        return `rgba(${100 + getRand()},${100 + getRand()},${100 + getRand()},${0.9 + Math.floor(0.1 * Math.random())})`;
    }

    useEffect(
        () => {
            const interValID = setInterval(
                () => {
                    setColor(randColor());
                    console.log('200');
                }, 2000
            );

            return () => {
                clearInterval(interValID);
            }
        }, []
    )

    useEffect(
        () => {
            if (chatBoxRef.current) {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }
        }, [chatBoxRef,chatBox]
    )

    

    console.log(color);

    const dispatch = useDispatch();
    return (
        <div className='md:w-[500px] w-[94vw]  text-white h-[650px] z-20 bg-richblack-700 fixed md:bottom-3 bottom-0 right-3 rounded-xl overflow-hidden '
        style={{
            border: '2px solid '+randColor()
        }}
        >

            <div className='flex justify-between p-4 border-b-2 border-b-richblack-400 items-center h-[8%]'>
                <p className={`font-extrabold text-xl transition-all duration-300`}
                    style={{ color }}
                >
                    Help Bot , Ask Anything !!
                </p>

                <button
                    onClick={() => {
                        dispatch(toggleShowChat())
                    }}
                >
                    <ImCross />
                </button>
            </div>

            {/* chat area  */}
            <div className='bg-fixed overflow-auto px-2 flex flex-col gap-y-2 h-[82.6%]'
                ref={chatBoxRef}
            >
                {
                    chatBox.map((ele, key) => {
                        return <div key={key}
                            className={`
                     text-richblack-25 max-w-[90%] w-maxContent text-sm flex flex-wrap break-words rounded-xl p-2
                    ${(ele.isbot) ? ('place-self-start') : ('place-self-end')} relative
                    `}
                        >
                            <div className='relative z-20 h-full bg-richblack-800 p-3 rounded-xl'>
                                {
                                    <ReactMarkdown>{ele.text}</ReactMarkdown>
                                }
                            </div>
                            
                        </div>
                    })
                }
                {isBotTyping&&
                    
                    <div className='w-[30%]'>
                        <span className='tyloader relative place-self-start'></span>
                    </div>
                }
            </div>

            {/* message btn  */}
            <form className='w-full h-[9%] bg-richblack-800 p-2 flex'
                onSubmit={(event) => {
                        event.preventDefault();
                        dispatch(getGeminiResponse(userMessage))
                        setuserMessage('');
                    }}
            >

                <div className='h-full w-[87%]'>
                    <input
                        required={true}
                        placeholder='Enter Your Message'
                        className='h-full w-full text-richblack-900 bg-richblack-100 outline-none placeholder:text-richblack-400 p-2
                    rounded-full
                    '
                        value={userMessage}
                        onChange={(event) => {
                            setuserMessage(event.target.value);
                        }}
                    />
                </div>

                <button className='w-auto text-3xl justify-center items-center px-2 py-[1px]'
                    type='submit'
                    disabled={isBotTyping}
                >
                    <IoSend />
                </button>

            </form>

        </div>
    )
}

export default ChatBotMessageBox
