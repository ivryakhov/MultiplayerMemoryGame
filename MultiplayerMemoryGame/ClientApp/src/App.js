import React, { Component } from 'react';
import { ConnectedGameBoard } from './components/GameBoard';

export const App = () => (
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
                            <ConnectedGameBoard />
                       </div>
                    </div>
                </div>
            </div>
        );
