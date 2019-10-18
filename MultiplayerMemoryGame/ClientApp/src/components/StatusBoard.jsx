import React from 'react';
import { connect } from "react-redux";

const StatusBoard = ({ gameState, activePlayer, currentPlayer }) => {
    return (
        <div>
            <p>{gameState}</p>
            {activePlayer.name != ""
                ?
            <div>
            {
                activePlayer.name == currentPlayer.name
                ?
                    <p>Your turn</p>
                    :
                    <p>{activePlayer.name}'s turn</p>
            }
                </div>
                :
                <div></div>
            }
            
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameState: state.reducer.board.state,
        activePlayer: state.reducer.activePlayer,
        currentPlayer: state.reducer.currentPlayer
    }
}

export const ConnectedStatusBoard = connect(mapStateToProps)(StatusBoard);