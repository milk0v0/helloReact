import React, { useState } from 'react'

import Child from './Child';

export default function App() {
    const [show, setShow] = useState(true)
    return (
        <div>
            {show && <Child content="你好~" />}
            <button onClick={()=>(setShow(!show))}>安装/卸载</button>
        </div>
    )
}