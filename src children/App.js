import React, { Component } from 'react';

import Child from './Child'

class App extends Component {
    render() {
        return (
            <Child child1={<div>1</div>}
            child2={<div>2</div>} />
        )
    }
}

export default App;