import React, { Component } from 'react';

const eleStr = `<h1>hello~</h1>`

class App extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{
                __html: eleStr
            }}></div>
        )
    }
}

export default App;