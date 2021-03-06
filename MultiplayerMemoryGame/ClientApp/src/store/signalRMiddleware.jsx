﻿import * as signalR from "@aspnet/signalr";
import * as mutations from './mutations';

let connection;

const setupConnection = (store) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/gameHub")
        .build();    
    
    connection.on('PlayerJoined', data => {
        store.dispatch({ type: mutations.PLAYER_JOINED, player: data });        
    });

    connection.on('PlayerLeaved', data => {
        store.dispatch({ type: mutations.PLAYER_LEAVED, name: data });
    })

    connection.on('PlayersListProvided', data => {
        store.dispatch({ type: mutations.PLAYERS_LIST_PROVIDED, players: data });
    });

    connection.on('PlayerLoginSuccess', data => {
        localStorage.setItem('playerName', data);
        store.dispatch({ type: mutations.PLAYER_LOGIN_SUCCESS, playerName: data });
    })

    connection.on('PlayerLogoutSuccess', _data => {
        localStorage.removeItem('playerName');
        store.dispatch({ type: mutations.PLAYER_LOGOUT_SUCCESS });
    })

    connection.on('PlayerLoginFailed', data => {
        store.dispatch({ type: mutations.PLAYER_LOGIN_FAILED, errorMessage: data });
    })

    connection.on('BoardStateProvided', data => {
        store.dispatch({ type: mutations.BOARD_STATE_PROVIDED, board: data });
    })

    connection.on('LogMessage', data => {
        store.dispatch({ type: mutations.LOG_MESSAGE_PROVIDED, message: data });
    })

    connection.on('NewActivePlayer', data => {
        store.dispatch({ type: mutations.NEW_ACTIVE_PLAYER, player: data });
    })

    connection.on('WinnersListProvided', data => {
        store.dispatch({ type: mutations.WINNERS_LIST_PROVIDED, winners: data });
    })

    connection.start()
        .then(() => {
            var playerName = localStorage.getItem('playerName');
            if (playerName) {
                connection.invoke('ReturnToGame', playerName);
            }
        })
        .catch(err => document.write(err));

    return connection;
};


export function signalRInvokeMiddleware(store) {
    if (!connection) {
        connection = setupConnection(store);
    }
    return (next) => async (action) => {       
            switch (action.type) {
                case mutations.JOIN_PLAYER:
                    if (!connection) {
                        connection = setupConnection(store);
                    }
                    connection.invoke('JoinGame', action.name);
                    break;
                case mutations.REQUEST_PLAYERS_LIST:
                    if (!connection) {
                        connection = setupConnection(store);
                    }
                    connection.invoke('RequestPlayersList');
                    break;
                case mutations.REQUEST_LEAVE_GAME:
                    var state = store.getState();
                    connection.invoke('LeaveGame', state.reducer.currentPlayer.name);
                    break;
                case mutations.PROCESS_CARD_CLICK:
                    var state = store.getState();
                    connection.invoke('ProcessCardClick', action.index, state.reducer.currentPlayer.name);
                    break;
                case mutations.REQUEST_NEW_GAME:
                    connection.invoke('RequestNewGame')
                    break;
                default:
                    break;
            }
      
        return next(action);
    };
}