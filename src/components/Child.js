import React from 'react'
import { useEffect } from 'react'

const Child = ({handleCnt}) => {
    useEffect(() =>{
        handleCnt(5);
    })
  return (
    <div>
        Child
    </div>
  )
}

export default Child