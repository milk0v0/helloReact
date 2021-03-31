import React, { Component } from 'react';

class App extends Component {
    state = {
        val: '',
        bol: true
    }
    render() {
        let { val, bol } = this.state;
        return (
            <div>
                <input value={val} onChange={({ target }) => {
                    this.setState({
                        val: target.value
                    })
                }} />
                <input defaultValue={val} />
                <p>{val}</p>

                <input type="checkBox" checked={bol} onChange={({ target }) => {
                    this.setState({
                        bol: target.checked
                    })
                }} />
                <input type="checkBox" defaultChecked="true" />
                <p>{bol + ''}</p>
            </div>
        )
    }
}

export default App;