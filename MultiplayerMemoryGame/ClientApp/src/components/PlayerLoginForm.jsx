import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from "react-redux";


const PlayerLoginForm = ({ currentPlayer, joinPlayer, leaveGame }) => (
    <div>
    {currentPlayer.isJoined !== mutations.LOGGEDIN
        ?
        <div>
            <form onSubmit={joinPlayer}>
                <div className="field">
                    <p className="control">
                        <input type="text"
                            name="playerName"
                            autoComplete="off"
                            className={(currentPlayer.errorMessage === "" ? "is-primary" : "is-danger") + " input is-medium"}
                            disabled={currentPlayer.isJoined === mutations.LOGGING}
                            placeholder="Enter your name to join"
                        />
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <button type="submit"
                            className={"button is-medium is-primary" + (currentPlayer.isJoined === mutations.LOGGING ? " is-loading" : "")}
                            disabled={currentPlayer.isJoined === mutations.LOGGING}
                        >
                            Join
                        </button>
                    </p>
                </div>
            </form>
        </div>

        :
        <div>
                <button type="submit"
                    className={"button is-medium is-primary" + (currentPlayer.isJoined === mutations.LOGGING ? " is-loading" : "")}
                    disabled={currentPlayer.isJoined === mutations.LOGGING}
                    onSubmit={leaveGame}
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
    leaveGame(e) {
        e.preventDefault();
        dispatch(mutations.requestLeaveGame());
    }
});

export const ConnectedPlayerLoginForm = connect(mapStateToProps, mapDispatchToProps)(PlayerLoginForm);