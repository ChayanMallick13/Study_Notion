import React from 'react'

const  IconBtn = ({
    children,
    text,
    customClasses,
    onClick,
    disabled,
    outline=false,
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
    className={customClasses}
    >
        {
            (children)?(
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ):(
                text
            )
        }
    </button>
  )
}

export default IconBtn;
