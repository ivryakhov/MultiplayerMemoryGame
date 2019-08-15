export const BEGIN_TURN = `BEGIN_TURN`;

export const PROCESS_CARD_CLICK = `PROCESS_CARD_CLICK`;

export const processCardClick = (name, index) => ({
    type: PROCESS_CARD_CLICK,
    name: name,
    index: index
});