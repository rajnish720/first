import React, {useState} from 'react'
import Child from './Child';

const Parent = () => {
    const [cnt, setCnt] = useState(0);
    // const val = 10;
        const handleCnt = (val) => {
            setCnt(val);
        }
  return (
    <div>
        <div>{cnt}</div>
        <Child handleCnt={handleCnt} />
        <div>{cnt}</div>
    </div>
  )
}

export default Parent