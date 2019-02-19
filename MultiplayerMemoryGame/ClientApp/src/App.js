import React, { Component } from 'react';
import GameBoard from './components/GameBoard';

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="tile is-ancestor">
                    <div className="tile is-3 is-vertical is-parent">
                        <div className="tile is-child box">
                            <p className="title">Your Score:</p>
                        </div>
                        <div className="tile is-child box">
                            <p className="title">Opponent's score:</p>
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <div className="tile is-child box">
                            <GameBoard />
                       </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
