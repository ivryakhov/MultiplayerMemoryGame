import React from "react";
import Card from "./Card";
import styles from './GameBoardStyles';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
                     
        this.state = {
            cards: this.prepareCards(),
            openedCard: {},
            turnState: 'BEGIN'
        };
       
    }

    names = [
        'fa-anchor', 'fa-ambulance', 'fa-beer', 'fa-balance-scale', 'fa-bath',
        'fa-basketball-ball', 'fa-bicycle', 'fa-bone', 'fa-bug', 'fa-bus', 'fa-crown',
        'fa-crow', 'fa-chess-knight', 'fa-couch', 'fa-coffee'
    ];

    handleClick(name, index) {
        console.log(name, index);
        var newCards = [...this.state.cards];
        switch (this.state.turnState) {
            case 'BEGIN':
                newCards[index].disabled = true;
                newCards[index].close = false;
                this.setState({
                    turnState: 'ONE_CARD_OPENED',
                    openedCard: { name, index },
                    cards: newCards
                });
                break;
            case 'ONE_CARD_OPENED':
                const openedCard = this.state.openedCard;
                newCards[index].disabled = true;
                newCards[index].close = false;

                this.setState({
                    cards: newCards,
                    turnState: 'UNKNOWN'
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
                            turnState: 'BEGIN'
                        });
                    }, 1300);
                } else {
                    newCards[index].matched = true;
                    newCards[openedCard.index].matched = true;
                    this.setState({
                        turnState: 'BEGIN',
                        cards: newCards
                    });
                }
                break;
            default:
                console.log('Unknown state;');
        }
    }

    prepareCards() {
        const duplicatedNames = this.names.concat(this.names);
        const randomizedNames = this.shuffle(duplicatedNames);
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

    shuffle(array) {
        array.sort((a, b) => Math.random() - 0.5);
        return array;
    }

    render() {
        return (
            <div>
                <div style={styles.playground}>
                    {
                        this.state.cards.map((card, index) => {
                            return <Card key={index} picture={card.name} click={() => { this.handleClick(card.name, index); }} close={card.close} disabled={card.disabled} matched={card.matched}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default GameBoard;