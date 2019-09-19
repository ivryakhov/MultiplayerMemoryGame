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
                default:
                    break;
            }
      
        return next(action);
    };
}