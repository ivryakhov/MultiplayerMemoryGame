import React from 'react';
import { connect } from "react-redux";
import { requestPlayersList } from '../store/mutations';

const PlayerList = ({ players, getPlayersList }) => {
    return (
        <div>
            <p className="is-size-3">Active Players</p>
            {
                players.map((player,index) =>
                    < div >
                        <span>{player.name}</span>
                    </div>
                )
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        players: state.reducer.players
    };
};

const mapDispatchToProps = (dispatch) => ({
    getPlayersList() {
        dispatch(requestPlayersList());
    }
});

export const ConnectedPLayersList = connect(mapStateToProps, mapDispatchToProps)(PlayerList);