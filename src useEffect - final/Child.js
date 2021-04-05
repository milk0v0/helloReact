import React, { useState, useEffect, useRef } from 'react'

export default function Child(props) {
    const [count, setCount] = useState(1);

    const div = useRef(); // 获取 DOM
    const upDatee = useRef(count); // 获取源信息
    useEffect(() => {
        console.log(upDatee);
        upDatee.current = count; // 需要手动改变它才会更新，否则经过 挂载阶段 初始化后，不再发生变化
    })

    const upDate = useRef(false);
    useEffect(() => {
        console.log('componentDidMount');
        return () => {
            console.log('componentWillUnMount');
        }
    }, []);
    useEffect(() => {
        if (upDate.current) {
            console.log('compmonentDidUpdate');
        } else {
            upDate.current = true;
        }
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