export const BEGIN_TURN = `BEGIN_TURN`;
export const ONE_CARD_OPENED = `ONE_CARD_OPENED`;
export const TWO_CARDS_OPENED = `TWO_CARDS_OPENED`;
export const UNKNOWN_STATE = `UNKNOWN_STATE`;

export const PROCESS_CARD_CLICK = `PROCESS_CARD_CLICK`;
export const REQUEST_COMPARE_CARDS = `REQUEST_COMPARE_CARDS`;
export const COMPARE_CARDS = `COMPARE_CARDS`;

export const processCardClick = (name, index) => ({
    type: PROCESS_CARD_CLICK,
    name: name,
    index: index
});

export const compareOpenedCards = () => ({
    type: COMPARE_CARDS
});

export function requestCompareCards() {
    return {
        type: REQUEST_COMPARE_CARDS
    };

}