import React from 'react';
import { ConnectedGameBoard } from './components/GameBoard';
import { ConnectedPlayerLoginForm } from './components/PlayerLoginForm';
import { ConnectedPLayersList } from './components/PlayersList';

export const App = () => (
            <div className="app">
                <div className="tile is-ancestor">
                    <div className="tile is-3 is-vertical is-parent">
                        <div className="tile is-child box">
                            <ConnectedPLayersList />
                            <ConnectedPlayerLoginForm />
                        </div>
                        <div className="tile is-child box">
                            <p className="is-size-3">Mesage Log</p>  
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
