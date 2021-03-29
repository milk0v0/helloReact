import React, { Component } from 'react'
import content from './content'

// export default class SubChild extends Component {
//     state = {
//         count: 1
//     }
//     render() {
//         let { count } = this.state;
//         return (
//             <Consumer>
//                 {(content) => {
//                     console.log(content);
//                     return (<div>
//                         <p>name: {content.name}</p>
//                         <p>count: {count}</p>
//                         <button onClick={() => {
//                             this.setState({
//                                 count: count + 1
//                             })
//                         }}>递增</button>
//                         <button onClick={() => {
//                             content.setName('牛奶')
//                         }}>中文名</button>
//                     </div>)
//                 }}
//             </Consumer>
//         )
//     }
// }

export default class SubChild extends Component {
    state = {
        count: 1
    }
    static contextType = content;
    render() {
        let { count } = this.state;
        let { name, setName } = this.context;
        return (<div>
            <p>name: {name}</p>
            <p>count: {count}</p>
            <button onClick={() => {
                this.setState({
                    count: count + 1
                })
            }}>递增</button>
            <button onClick={() => {
                setName('牛奶')
            }}>中文名</button>
        </div>)
    }
}