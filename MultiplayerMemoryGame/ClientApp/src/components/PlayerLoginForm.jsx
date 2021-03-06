﻿import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from "react-redux";


const PlayerLoginForm = ({ currentPlayer, joinPlayer, leaveGame }) => (
    <div>
    {currentPlayer.isJoined !== mutations.LOGGEDIN
        ?
        <div>
            <form onSubmit={joinPlayer}>
                <div className="field has-addons">
                    <div className="control">
                        <input type="text"
                            name="playerName"
                            autoComplete="off"
                            className={(currentPlayer.errorMessage === "" ? "is-primary" : "is-danger") + " input is-medium"}
                            disabled={currentPlayer.isJoined === mutations.LOGGING}
                            placeholder="Enter your name to join"
                        />
                    </div>  
                    <div className="control">
                        <button type="submit"
                            className={"button is-medium is-primary" + (currentPlayer.isJoined === mutations.LOGGING ? " is-loading" : "")}
                            disabled={currentPlayer.isJoined === mutations.LOGGING}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </form>
        </div>

        :
        <div>
                <p className="is-size-3">{currentPlayer.name}</p>
                <button type="submit"
                    className={"button is-medium is-primary" + (currentPlayer.isJoined === mutations.LOGGING ? " is-loading" : "")}
                    disabled={currentPlayer.isJoined === mutations.LOGGING}
                    onClick={leaveGame}
                >
                    Leave Game
                </button>

        </div>
    }
        { currentPlayer.errorMessage !== "" ?
            <div className="notification is-danger">{currentPlayer.errorMessage}</div>
            : null
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        currentPlayer: state.reducer.currentPlayer
    };
};

const mapDispatchToProps = (dispatch) => ({
    joinPlayer(e) {
        e.preventDefault();
        let playerName = e.target[`playerName`].value;
        dispatch(mutations.requestJoinPlayer(playerName));
    },
    leaveGame() {        
        dispatch(mutations.requestLeaveGame());
    }
});

export const ConnectedPlayerLoginForm = connect(mapStateToProps, mapDispatchToProps)(PlayerLoginForm);