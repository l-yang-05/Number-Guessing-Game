import React from 'react';

class Textbox extends React.Component {
    render() {
        return <input value={this.props.value} onChange={this.props.data} id="guess" />
    }


}


export default Textbox;