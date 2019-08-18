import React from "react";
import { Card } from "./Card";
import styles from "./GameBoardStyles";
import { processCardClick, requestCompareCards } from "../store/mutations";
import { connect } from "react-redux";

export const GameBoard = ({ board, handleClickOnCard }) => (
    <div>
        <div style={styles.playground}>
            {
                board.cards.map((card, index) => {
                    return <Card key={index} picture={card.name} click={() => handleClickOnCard(card.name, index)} close={card.close} disabled={card.disabled} matched={card.matched} />;
                })
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        board: state.reducer.board
    };
};

const mapDispatchToProps = (dispatch) => ({
    handleClickOnCard(name, index) {
        dispatch(processCardClick(name, index));
        dispatch(requestCompareCards(name, index));
    }
});

export const ConnectedGameBoard = connect(mapStateToProps, mapDispatchToProps)(GameBoard);