export const BEGIN_TURN = `BEGIN_TURN`;
export const ONE_CARD_OPENED = `ONE_CARD_OPENED`;
export const TWO_CARDS_OPENED = `TWO_CARDS_OPENED`;
export const UNKNOWN_STATE = `UNKNOWN_STATE`;
export const APPLY_CARDS_COMPARE_RESULT = `APPLY_CARDS_COMPARE_RESULT`;

export const PROCESS_CARD_CLICK = `PROCESS_CARD_CLICK`;
export const REQUEST_COMPARE_CARDS = `REQUEST_COMPARE_CARDS`;
export const COMPARE_CARDS = `COMPARE_CARDS`;

export const JOIN_PLAYER = `JOIN_PLAYER`;
export const PLAYER_JOINED = `PLAYER_JOINED`;
export const PLAYER_LOGIN_SUCCESS = `PLAYER_LOGIN_SUCCESS`;
export const PLAYER_LOGIN_FAILED = `PLAYER_LOGIN_FAILED`;


export const REQUEST_PLAYERS_LIST = `REQUEST_PLAYERS_LIST`;
export const PLAYERS_LIST_PROVIDED = `PLAYERS_LIST_PROVIDED`;

export const processCardClick = (name, index) => ({
    type: PROCESS_CARD_CLICK,
    name: name,
    index: index
});

export const requestJoinPlayer = (playerName) => ({
    type: JOIN_PLAYER,
    name: playerName
});

export const requestPlayersList = () => ({
    type: REQUEST_PLAYERS_LIST
});