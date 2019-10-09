import React from 'react';

class Btnsubmit extends React.Component {
    render() {
        return (
            <div className="container-score">
                {/* perfoms the function buttonClick */}
                <button onClick={this.props.data} >Guess</button>
                <button onClick={this.props.reset}>Reset</button>
                <button onClick={this.props.changeDiff}>Change Difficulty</button>
            </div>
        )
    }
}

export default Btnsubmit;