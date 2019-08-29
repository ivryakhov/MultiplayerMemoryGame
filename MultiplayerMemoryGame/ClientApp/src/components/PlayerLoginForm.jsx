import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from "react-redux";


const PlayerLoginForm = ({ joinPlayer }) => (
    <div>
        <form onSubmit={joinPlayer}>
            <input type="text" name="playerName" autoComplete="off" placeholder="Enter your name to join" />
            <button type="submit">Join</button>
        </form>
    </div>
);

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => ({
    joinPlayer(e) {
        e.preventDefault();
        let playerName = e.target[`playerName`].value;
        dispatch(mutations.requestJoinPlayer(playerName));
    }
});

export const ConnectedPlayerLoginForm = connect(mapStateToProps, mapDispatchToProps)(PlayerLoginForm);