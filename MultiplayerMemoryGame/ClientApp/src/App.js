import React from 'react';
import { ConnectedGameBoard } from './components/GameBoard';
import { ConnectedPlayerLoginForm } from './components/PlayerLoginForm';
import { ConnectedPLayersList } from './components/PlayersList';
import { ConnectedLogMessages } from './components/LogMessages';
import { ConnectedStatusBoard } from './components/StatusBoard';

export const App = () => (
            <div className="app">
                <div className="tile is-ancestor">
                    <div className="tile is-3 is-vertical is-parent">
                        <div className="tile is-child box">                            
                            <ConnectedPlayerLoginForm />
                            <ConnectedStatusBoard />
                        </div>
                        <div className="tile is-child box">
                            <ConnectedPLayersList />
                        </div>
                        <div className="tile is-child box">
                            <ConnectedLogMessages />  
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
