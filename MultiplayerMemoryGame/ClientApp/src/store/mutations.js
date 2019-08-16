export const BEGIN_TURN = `BEGIN_TURN`;
export const ONE_CARD_OPENED = `ONE_CARD_OPENED`;
export const UNKNOWN_STATE = `UNKNOWN_STATE`;

export const PROCESS_CARD_CLICK = `PROCESS_CARD_CLICK`;

export const processCardClick = (name, index) => ({
    type: PROCESS_CARD_CLICK,
    name: name,
    index: index
});