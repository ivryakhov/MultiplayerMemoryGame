import React from 'react';
import { connect } from "react-redux";

const PlayerList = ({ players }) => (
    <div>
        {
            players.map((player) => 
                < div >
                    <span>{player.name}</span>
                </div>            
            )
        }
    </div>

    );

const mapStateToProps = (state) => {
    return {
        players: state.reducer.players
    };
};

export const ConnectedPLayersList = connect(mapStateToProps)(PlayerList);