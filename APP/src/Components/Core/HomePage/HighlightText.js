import React from 'react'

function HighlightText({text,color='font-bold bg-gradient-to-b from-blue-200 to-caribbeangreen-25 text-transparent bg-clip-text'}) {
  return (
    <span className={color}>
        {text}
    </span>
  )
}

export default HighlightText
