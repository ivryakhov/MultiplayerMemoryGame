import * as signalR from "@aspnet/signalr";
import * as mutations from './mutations';

let connection;

const setupConnection = (store) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/gameHub")
        .build();    
    
    connection.on('PlayerJoined', data => {
        store.dispatch({ type: mutations.PLAYER_JOINED, name: data });        
    });

    connection.on('PlayersListProvided', data => {
        store.dispatch({ type: mutations.PLAYERS_LIST_PROVIDED, players: data });
    });

    connection.on('PlayerLoginSuccess', data => {
        store.dispatch({ type: mutations.PLAYER_LOGIN_SUCCESS, playerName: data });
    })

    connection.on('PlayerLoginFailed', data => {
        store.dispatch({ type: mutations.PLAYER_LOGIN_FAILED, errorMessage: data });
    })

    connection.start().catch(err => document.write(err));

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
                    connection.invoke('RequestLeaveGame');
                default:
                    break;
            }
      
        return next(action);
    };
}