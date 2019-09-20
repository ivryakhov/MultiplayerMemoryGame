import React from "react";
import { Card } from "./Card";
import styles from "./GameBoardStyles";
import { processCardClick } from "../store/mutations";
import { connect } from "react-redux";

export const GameBoard = ({ board, handleClickOnCard }) => (
    <div>
        <div style={styles.playground}>
            {
                board.cards.map((card, index) => {
                    return <Card key={index} picture={card.frontValue} click={() => handleClickOnCard(card.frontValue, index)} closed={card.isClosed} disabled={card.isDisabled} matched={card.isMatched} />;
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
    handleClickOnCard(frontValue, index) {
        dispatch(processCardClick(frontValue, index));        
    }
});

export const ConnectedGameBoard = connect(mapStateToProps, mapDispatchToProps)(GameBoard);