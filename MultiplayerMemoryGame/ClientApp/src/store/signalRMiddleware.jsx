import * as signalR from "@aspnet/signalr";
import * as mutations from './mutations';

let connection;

const setupConnection = (store) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/gameHub")
        .build();
    connection.start().catch(err => document.write(err));

    
    //conn.on('PlayerJoined', data => {
    //    store.dispatch({ type: mutations.PLAYER_JOINED, name: data.name });
    //    console.log("Player dispatched");
    //});

    //conn.start().catch(function (err) { return console.error(err.toString()); });

    return connection;
};


export function signalRInvokeMiddleware(store) {
   
        connection = setupConnection(store);
  
    return (next) => async (action) => {       
            switch (action.type) {
                case mutations.JOIN_PLAYER:
                    console.log("Join player ", action.name);
                    connection.invoke('JoinGame', action.name);
                    break;
                default:
                    break;
            }
      
        return next(action);
    };
}