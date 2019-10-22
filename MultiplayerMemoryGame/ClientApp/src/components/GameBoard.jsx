import React from "react";
import { Card } from "./Card";
import styles from "./GameBoardStyles";
import { processCardClick } from "../store/mutations";
import { connect } from "react-redux";

const GameBoard = ({ board, handleClickOnCard }) => (
    <div>
        <div style={styles.playground}>
            {
                board.cards.map((card) => {
                    return <Card key={card.id} picture={card.frontValue} click={() => handleClickOnCard(card.index)} closed={card.isClosed} disabled={card.isDisabled} matched={card.isMatched} />;
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
    handleClickOnCard(index) {
        dispatch(processCardClick(index));        
    }
});

export const ConnectedGameBoard = connect(mapStateToProps, mapDispatchToProps)(GameBoard);