import { combineReducers } from 'redux';
import * as mutations from './mutations';

const names = [
    'fa-anchor', 'fa-ambulance', 'fa-beer', 'fa-balance-scale', 'fa-bath',
    'fa-basketball-ball', 'fa-bicycle', 'fa-bone', 'fa-bug', 'fa-bus', 'fa-crown',
    'fa-crow', 'fa-chess-knight', 'fa-couch', 'fa-coffee'
];

let defaultState = {
    board: {
        cards: prepareCards(),
        openedCards: [],
        turnState: mutations.BEGIN_TURN
    },
    players: ['Player1', 'Player2']
};

export const reducer = combineReducers({
    board:(boardState = defaultState.board, action) => {
        let { type, name, index } = action;
        switch (type) {
            case mutations.PROCESS_CARD_CLICK:
                return updateBoardState(boardState, name, index);
            case mutations.COMPARE_CARDS:
                return compareCards(boardState, name, index);
            default:
                return boardState;
        }        
    }
});

function compareCards(boardState, name, index) {
    switch (boardState.turnState) {
        case mutations.TWO_CARDS_OPENED:
        {
            var newCards = boardState.cards;
            const openedCards = boardState.openedCards;

            if (opendedCardsAreEqual(openedCards)) {
                openedCards.map(({ name, index }) => (
                    newCards[index].matched = true));
            }
            else {
                console.log("do not match");
                openedCards.map(({ name, index }) => {                    
                    newCards[index].closed = true;
                    newCards[index].disabled = false;                    
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
    return (openedCards[0].name === openedCards[1].name && openedCards[0].index !== openedCards[1].index);
}

function prepareCards() {
    const duplicatedNames = names.concat(names);
    const randomizedNames = shuffle(duplicatedNames);
    const preparedCards = randomizedNames.map((name, index) => {
        const card =
        {
            name: name,
            closed: true,
            disabled: false,
            matched: false
        };
        return card;
    });
    return preparedCards;
}

function shuffle(array) {
    array.sort((a, b) => Math.random() - 0.5);
    return array;
}

function updateBoardState(boardState, name, index) {
    var newCards = boardState.cards;
    var newOpenedCards = boardState.openedCards;
    switch (boardState.turnState) {
        case mutations.BEGIN_TURN:
            newCards[index].disabled = true;
            newCards[index].closed = false;
            newOpenedCards[0] = { name, index };
            return {...boardState,
                turnState: mutations.ONE_CARD_OPENED,
                openedCards: newOpenedCards,
                cards: newCards
            };            
        case mutations.ONE_CARD_OPENED:
        {
            newCards[index].disabled = true;
            newCards[index].closed = false;
            newOpenedCards[1] = { name, index };
            return {
                ...boardState,
                openedCards: newOpenedCards,
                cards: newCards,
                turnState: mutations.TWO_CARDS_OPENED
            };
            }
        case mutations.TWO_CARDS_OPENED:
            return boardState;

        default:
            console.log('Unknown state;');
    }
}