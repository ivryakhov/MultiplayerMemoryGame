import React from 'react';
import { connect } from "react-redux";
import { requestPlayersList } from '../store/mutations';

const PlayerList = ({ players }) => {
    return (
        <div>
            <p className="is-size-3">Active Players</p>
            {
                players.map((player,index) =>
                    < div >
                        <span>{player.name} {player.score}</span>
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

export const ConnectedPLayersList = connect(mapStateToProps)(PlayerList);