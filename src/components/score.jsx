import React from 'react';
import HighScore from './HighScore';

class Scoreboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }


    // Setting this.props.score.length equal to this.state.data
    componentDidUpdate() {
        if (this.props.score.length !== this.state.data.length) {
            this.setState.data = this.props.score
        }
    }


    render() {
        return (
            <div className="container-score">
                <div className="score">
                    <h2>Number of Guesses</h2>
                    {/* Lists all of the user's guess on the scoreboard */}
                    {this.props.score.map((item, index) => {
                        return (
                            <p key={index}>{item.winGuess} {item.value}</p>
                        )
                    }
                    )}
                </div>
                <div className="highscore">
                    <h2>High Score</h2>
                    <h4>{this.props.level}</h4>
                    <HighScore didWin={this.props.highScore} />
                </div>
            </div>
        )
    }

}

export default Scoreboard;