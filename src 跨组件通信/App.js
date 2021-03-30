import React, { Component } from 'react';
import Child from './Child';

import { Provider } from './content'

class App extends Component {
    state = {
        name: 'milk'
    }
    setName = newName => {
        this.setState({
            name: newName
        })
    }
    render() {
        let { name } = this.state;
        return (
            <div>
                <Provider value={{
                    name: name,
                    setName: this.setName
                }}>
                    {/* <Child name={name} setName={this.setName}></Child> */}
                    <Child></Child>
                </Provider>
            </div>
        )
    }
}

export default App;