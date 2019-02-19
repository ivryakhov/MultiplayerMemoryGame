import React from "react";
import Card from "./Card";
import styles from './GameBoardStyles';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
                     
        this.state = {
            cards: this.prepareCards(),
            randomizedPictures: [],
            finalizedPictures: [],
            openedPictures: []
        };
       
    }

    names =
        [
            'fa-anchor', 'fa-ambulance', 'fa-beer', 'fa-balance-scale', 'fa-bath',
            'fa-basketball-ball', 'fa-bicycle', 'fa-bone', 'fa-bug', 'fa-bus', 'fa-crown',
            'fa-crow', 'fa-chess-knight', 'fa-couch', 'fa-coffee'
        ];

    handleClick(name, index) {
        console.log(name, index);
    /*    if (this.state.openedPictures.length === 2) {
            setTimeout(() => {
                this.check();
            }, 750);
        } else {
            let picture = {
                name,
                index
            };
            let finalizedPictures = this.state.finalizedPictures;
            let pictures = this.state.openedPictures;
            finalizedPictures[index].close = false;
            pictures.push(picture);
            this.setState({
                openedPictures: pictures,
                finalizedPictures: finalizedPictures
            });
            if(this.state.openedPictures.length === 2) {
                setTimeout(() => {
                    this.check();
                }, 750);
            }
        }*/
    }

    check() {
        let finalizedPictures = this.state.finalizedPictures;
        if ((this.state.openedPictures[0].name === this.state.openedPictures[1].name) &&
            (this.state.openedPictures[0].name !== this.state.openedPictures[1].index)) {
            finalizedPictures[this.state.openedPictures[0].index].complete = true;
            finalizedPictures[this.state.openedPictures[1].index].complete = true;
        } else {
            finalizedPictures[this.state.openedPictures[0].index].close = true;
            finalizedPictures[this.state.openedPictures[1].index].close = true;
        }
        this.setState({
            finalizedPictures,
            openedPictures: []
        });
    }

    prepareCards() {
        const duplicatedNames = this.names.concat(this.names);
        const randomizedNames = this.shuffle(duplicatedNames);
        const preparedCards = randomizedNames.map((name, index) => {
            const card =
            {
                name,
                close: true,
                complete: false,
                fail: false
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
                            return <Card key={index} picture={card.name} click={() => { this.handleClick(card.name, index); }} close={card.close} complete={card.complete} />;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default GameBoard;