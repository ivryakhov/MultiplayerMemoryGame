import * as mutations from './mutations';
import { loop, Cmd, combineReducers } from 'redux-loop';

let defaultState = {
    board: {
        cards: [],
        idexesToPostoponeClosing: []
    },
    players: [],
    currentPlayer: {
        isJoined: mutations.LOGGEDOUT,
        name: "",
        errorMessage: ""
    }
};

export const reducer = combineReducers({
    board:(boardState = defaultState.board, action) => {
        switch (action.type) {
            case mutations.BOARD_STATE_PROVIDED:
                if (action.board.idexesToPostoponeClosing.length === 0) {
                    return {
                        ...boardState,
                        cards: action.board.cards,
                        idexesToPostoponeClosing: action.board.idexesToPostoponeClosing
                    };
                }
                else {
                    return loop(
                        {
                            ...boardState,
                            cards: action.board.cards.map((card, index) => {
                                if (card.index === action.board.idexesToPostoponeClosing[0] ||
                                    card.index === action.board.idexesToPostoponeClosing[1]) {
                                    card.isClosed = false;
                                }
                                card.isDisabled = true;
                                return card;
                            }),
                            idexesToPostoponeClosing: action.board.idexesToPostoponeClosing
                        },
                        Cmd.run(takeATimeout, {
                            args: [],
                            successActionCreator: () => ({
                                type: mutations.CLOSE_POSTPONED_CARDS
                            })
                        })
                    );
                }
            case mutations.CLOSE_POSTPONED_CARDS:
                return {
                    ...boardState,
                    cards: boardState.cards.map((card, index) => {
                        if (card.index === boardState.idexesToPostoponeClosing[0] ||
                            card.index === boardState.idexesToPostoponeClosing[1]) {
                           card.isClosed = true;
                        }
                        card.isDisabled = false;
                        return card;
                    }),
                    idexesToPostoponeClosing: []
                }                
            default:
                return boardState;
        }        
    },
    players: (players = defaultState.players, action) => {
        switch(action.type) {
            case mutations.PLAYER_JOINED: 
                return [...players, { name: action.name }];
            case mutations.PLAYERS_LIST_PROVIDED:
                return action.players.map((player) => { return { name: player }; });
            case mutations.PLAYER_LEAVED:
                return players.filter((player) => { return player.name != action.name });
            default:
                return players;
        }        
    },
    currentPlayer: (currentPlayer = defaultState.currentPlayer, action) => {
        switch (action.type) {
            case mutations.PLAYER_LOGIN_SUCCESS:
                return {
                    ...currentPlayer,
                    isJoined: mutations.LOGGEDIN,
                    name: action.playerName,
                    errorMessage: ""
                }
            case mutations.PLAYER_LOGIN_FAILED:
                return {
                    ...currentPlayer,
                    isJoined: mutations.LOGGEDOUT,
                    errorMessage: action.errorMessage
                }
            case mutations.JOIN_PLAYER:
                return {
                    ...currentPlayer,
                    isJoined: mutations.LOGGING
                }
            case mutations.PLAYER_LOGOUT_SUCCESS:
                return defaultState.currentPlayer;
            default:
                return currentPlayer;
        }
    }
});

function takeATimeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok');
        }, 1300);
    });
}