import React, { useState, useEffect, useRef } from 'react'

export default function Child(props) {
    const [count, setCount] = useState(1);

    const div = useRef(); // 获取 DOM
    const upDate = useRef(count); // 获取源信息
    useEffect(() => {
        console.log(upDate);
        upDate.current = count; // 需要手动改变它才会更新，否则经过 挂载阶段 初始化后，不再发生变化
    })

    return (
        <div ref={div}>
            <p>{count}</p>
            <button onClick={() => {
                setCount(count + 1);
            }}>递增</button>
        </div>
    )
}