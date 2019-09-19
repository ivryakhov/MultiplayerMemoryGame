import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from "react-redux";


const PlayerLoginForm = ({ currentPlayer, joinPlayer }) => (
    <div>
    {
        currentPlayer.isJoined === false ?
            <div>
                <form onSubmit={joinPlayer}>
                    <div className="field">
                        <p className="control">
                            <input type="text"
                                name="playerName"
                                autoComplete="off"
                                className="input is-medium is-primary"
                                placeholder="Enter your name to join"
                            />
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button type="submit"
                                className="button is-medium is-primary"
                            >
                                Join
                        </button>
                        </p>
                    </div>
                </form>
            </div>
        : <div></div>
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
    }
});

export const ConnectedPlayerLoginForm = connect(mapStateToProps, mapDispatchToProps)(PlayerLoginForm);