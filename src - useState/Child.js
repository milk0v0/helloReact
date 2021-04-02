import React, { useState } from 'react'

export default function Child(props) {
    // const [count, setCount] = useState(1);
    // const [name, setName] = useState('milk');
    const [state, setState] = useState({
        name: 'milk',
        count: 1
    })
    const { name, count } = state

    return (
        <div>
            <input value={name} onChange={({ target }) => {
                // setName(target.value);
                setState({
                    ...state,
                    name: target.value
                })
            }} />
            <p>{count}</p>
            <button onClick={() => {
                // setCount(count + 1);
                setState({
                    ...state,
                    count: count + 1
                })
            }}>递增</button>
        </div>
    )
}
