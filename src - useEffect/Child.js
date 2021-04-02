import React, { useState, useEffect } from 'react'

export default function Child(props) {
    const [count, setCount] = useState(1);
    const [val, setVal] = useState('');
    // useEffect(() => {
    //     console.log('组件 挂载/更新 完成');
    //     return () => {
    //         console.log('组件 准备更新/即将卸载');
    //     }
    // })

    useEffect(() => {
        console.log('componentDidMount');
        return () => {
            console.log('componentWillUnmount');
        }
    }, []);

    // useEffect(() => {
    //     console.log('componentDidMount');
    //     return () => {
    //         console.log('componentWillUnmount');
    //     }
    // }, [count])

    return (
        <div>
            <input type="text" value={val} onChange={({ target }) => {
                setVal(target.value)
            }} />
            <p>{count}</p>
            <button onClick={() => {
                setCount(count + 1);
            }}>递增</button>
        </div>
    )
}