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
        openedCard: {},
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
            let newCards = [...boardState.cards];
            const openedCard = boardState.openedCard;

            if (name !== openedCard.name) {
                console.log("do not match");
                newCards[index] = {
                    name: name,
                    close: true,
                    disabled: false
                };
                newCards[openedCard.index] = {
                    name: openedCard.name,
                    close: true,
                    disabled: false
                };
            } else {
                newCards[index].matched = true;
                newCards[openedCard.index].matched = true;
            }
            return {
                ...boardState,
                openedCard: {},
                cards: newCards,
                turnState: mutations.BEGIN_TURN
            };
        }
        default:
            return boardState;
    }
}

function prepareCards() {
    const duplicatedNames = names.concat(names);
    const randomizedNames = shuffle(duplicatedNames);
    const preparedCards = randomizedNames.map((name, index) => {
        const card =
        {
            name: name,
            close: true,
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
    var newCards = [...boardState.cards];
    switch (boardState.turnState) {
        case mutations.BEGIN_TURN:
            newCards[index].disabled = true;
            newCards[index].close = false;
            return {...boardState,
                turnState: mutations.ONE_CARD_OPENED,
                openedCard: { name, index },
                cards: newCards
            };            
        case mutations.ONE_CARD_OPENED:
        {
            const openedCard = boardState.openedCard;
            newCards[index].disabled = true;
            newCards[index].close = false;

            return {
                ...boardState,
                cards: newCards,
                turnState: mutations.TWO_CARDS_OPENED
            };
        }
        default:
            console.log('Unknown state;');
    }
}