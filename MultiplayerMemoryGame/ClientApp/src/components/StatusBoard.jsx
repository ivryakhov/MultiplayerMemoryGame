import React from 'react';
import { connect } from "react-redux";
import { requestNewGame } from '../store/mutations';

const StatusBoard = ({ gameState, activePlayer, currentPlayer, winners, startNewGame }) => {
    return (
        <div>
            <span>{gameState}</span>
            {activePlayer.name != ""
                ?
            <div>
            {
                activePlayer.name == currentPlayer.name
                ?
                            <span class="is-success">Your turn</span>
                    :
                            <span class="is-warning">{activePlayer.name}'s turn</span>
            }
                </div>
                :
                <div></div>
            }
            {gameState == "Game finished"
                ?
                <div>
                    <p>Winner{winners.length < 2 ? "s" : ""}: {winners.map((winner) => { return winner.name + " " })}</p>
                    <button type="submit"
                        className={"button is-medium is-primary"}                        
                        onClick={startNewGame}>
                        Start New Game
                    </button>
                    
                </div>
                :
                <div></div>}
            
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameState: state.reducer.board.state,
        activePlayer: state.reducer.activePlayer,
        currentPlayer: state.reducer.currentPlayer,
        winners: state.reducer.winners
    }
}

const mapDispatchToProps = (dispatch) => ({
    startNewGame() {
        dispatch(requestNewGame());
    }
})

export const ConnectedStatusBoard = connect(mapStateToProps, mapDispatchToProps)(StatusBoard);