import * as mutations from './mutations';
import { loop, Cmd, combineReducers } from 'redux-loop';

let defaultState = {
    board: {
        cards: [],
        openedCards: [],
        turnState: mutations.BEGIN_TURN
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
        let { type, frontValue, index } = action;
        switch (type) {
            case mutations.PROCESS_CARD_CLICK:
                return updateBoardState(boardState, frontValue, index);
            case mutations.COMPARE_CARDS:                
                return compareCards(boardState);    
            case mutations.BOARD_STATE_PROVIDED:
                return {
                    ...boardState,
                    cards: action.board.cards
                };
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
            default:
                return currentPlayer;
        }
    }
});

function asyncCompareCards(openedCards) {
    return new Promise((resolve, reject) => {
        var timeout = 0;
        if (!opendedCardsAreEqual(openedCards))
            timeout = 1300;
        setTimeout(() => {
            resolve('ok');
        }, timeout);
    });
}

function compareCards(boardState) {
    switch (boardState.turnState) {
        case mutations.TWO_CARDS_OPENED:
        {
            var newCards = boardState.cards;
            const openedCards = boardState.openedCards;

            if (opendedCardsAreEqual(openedCards)) {
                openedCards.forEach(({ frontValue, index }) =>
                    newCards[index].isMatched = true);                   
                
            }
            else {
                openedCards.forEach(({ frontValue, index }) => {                    
                    newCards[index].isClosed = true;
                    newCards[index].isDisabled = false;                    
                });
            }
            return {
                ...boardState,
                openedCards: [],
                cards: newCards,
                turnState: mutations.BEGIN_TURN
            };
        }
        default:
            return boardState;
    }
}

function opendedCardsAreEqual(openedCards) {
    return (openedCards[0].frontValue === openedCards[1].frontValue && openedCards[0].index !== openedCards[1].index);
}


function updateBoardState(boardState, frontValue, index) {
    var newCards = boardState.cards;
    var newOpenedCards = boardState.openedCards;
    switch (boardState.turnState) {
        case mutations.BEGIN_TURN:
            newCards[index].isDisabled = true;
            newCards[index].isClosed = false;
            newOpenedCards[0] = { frontValue, index };
            return {...boardState,
                turnState: mutations.ONE_CARD_OPENED,
                openedCards: newOpenedCards,
                cards: newCards
            };            
        case mutations.ONE_CARD_OPENED:
        {
            newCards[index].isDisabled = true;
            newCards[index].isClosed = false;
            newOpenedCards[1] = { frontValue, index };
            return loop(
                {
                    ...boardState,
                    openedCards: newOpenedCards,
                    cards: newCards,
                    turnState: mutations.TWO_CARDS_OPENED
                },
                Cmd.run(asyncCompareCards, {
                    args: [newOpenedCards],
                    successActionCreator: () => ({
                        type: mutations.COMPARE_CARDS
                    })
                })
            );
        }
        case mutations.TWO_CARDS_OPENED:
            return boardState;

        default:
            console.log('Unknown state;');
    }
}