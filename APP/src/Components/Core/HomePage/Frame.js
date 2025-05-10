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
                            className={` ${imgh}
                ${(shadow) ? (`
                    ${(topleft) ? 'shadow-[16px_16px_29px_2px_rgba(55,117,192,0.4)]' :
                                        'shadow-[-16px_-16px_29px_2px_rgba(55,117,192,0.4)]'}
                `) : ('')}
                rounded-sm`}
                        />
                    )
            }

            <div className={`md:w-[20px] w-[12px] h-full ${color} absolute ${(topleft)
                ? ('md:-left-5 -left-3 md:bottom-5 bottom-2') : ('md:-right-5 -right-2 md:top-5 top-2 md:mt-0 mt-[2px]')
                }`}></div>
            <div className={`xl:w-[93%] w-[66%] md:h-[20px] h-[10px] ${color} absolute ${(topleft)
                ? ('md:-left-5 -left-2 md:-top-5 -top-2') : ('right-0 ')
                }`}></div>

        </div>
    )
}

export default Frame;
