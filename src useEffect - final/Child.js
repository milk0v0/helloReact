import React, { useState, useEffect, useRef } from 'react'

export default function App(props) {
    const [count, setCount] = useState(1)
    const upDate = useRef(false);

    useEffect(() => {
        console.log('componentDidMount');
        return () => {
            console.log('componentWillUnmount');
        }
    }, [])
    useEffect(() => {
        if (upDate.current) {
            console.log('componentDidUpdate');
        } else {
            upDate.current = true;
        }
        return () => {
            console.log('componentWillUpdate');
        }
    })
    return (
        <div>
            <div>{count}</div>
            <button onClick={() => {
                setCount(count + 1)
            }}>+1</button>
        </div>
    )
}