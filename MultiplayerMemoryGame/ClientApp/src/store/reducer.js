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
            default:
                return boardState;
        }        
    }
});

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
            this.setState({
                turnState: mutations.ONE_CARD_OPENED,
                openedCard: { name, index },
                cards: newCards
            });
            break;
        case mutations.ONE_CARD_OPENED:
            const openedCard = this.state.openedCard;
            newCards[index].disabled = true;
            newCards[index].close = false;

            this.setState({
                cards: newCards,
                turnState: mutations.UNKNOWN_STATE
            });

            if (name !== openedCard.name) {
                setTimeout(() => {
                    console.log('do not match');
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

                    console.log("timount");
                    this.setState({
                        openedCard: {},
                        cards: newCards,
                        turnState: mutations.BEGIN_TURN
                    });
                }, 1300);
            } else {
                newCards[index].matched = true;
                newCards[openedCard.index].matched = true;
                this.setState({
                    turnState: mutations.BEGIN_TURN,
                    cards: newCards
                });
            }
            break;
        default:
            console.log('Unknown state;');
    }
}