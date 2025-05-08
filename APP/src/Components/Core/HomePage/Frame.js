import React from 'react'

function Frame({ shadow, topleft, media, isvideo, imgh, imgw,color='bg-white' }) {
    return (
        <div className='relative'>

            {
                (isvideo) ?
                    (
                        <video
                            muted
                            loop
                            autoPlay
                            className={`
                ${(shadow) ? (`
                    ${(topleft) ? 'shadow-[16px_16px_29px_2px_rgba(55,117,192,0.4)]' :
                                        'shadow-[-16px_-16px_29px_2px_rgba(55,117,192,0.4)]'}
                `) : ('')}
                rounded-sm`}
                        >
                            <source src={media} type='video/mp4' />

                        </video>
                    ) :
                    (
                        <img src={media} alt='img'
                            style={{ height: imgh, width: imgw }}
                            className={`
                ${(shadow) ? (`
                    ${(topleft) ? 'shadow-[16px_16px_29px_2px_rgba(55,117,192,0.4)]' :
                                        'shadow-[-16px_-16px_29px_2px_rgba(55,117,192,0.4)]'}
                `) : ('')}
                rounded-sm`}
                        />
                    )
            }

            <div className={`w-[20px] h-full ${color} absolute ${(topleft)
                ? ('-left-5 bottom-5') : ('-right-5 top-5')
                }`}></div>
            <div className={`w-[90%] h-[20px] ${color} absolute ${(topleft)
                ? ('-left-5 -top-5') : ('left-5 ')
                }`}></div>

        </div>
    )
}

export default Frame;
