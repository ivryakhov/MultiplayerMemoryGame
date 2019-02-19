import React from "react";
import Card from "./Card";
import styles from './GameBoardStyles';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [
                'fa-anchor', 'fa-ambulance', 'fa-beer', 'fa-balance-scale', 'fa-bath',
                'fa-basketball-ball', 'fa-bicycle', 'fa-bone', 'fa-bug', 'fa-bus', 'fa-crown',
                'fa-crow', 'fa-chess-knight', 'fa-couch', 'fa-coffee'],
            duplicatedPictures: [],
            randomizedPictures: [],
            finalizedPictures: [],
            openedPictures: []
        };
        this.start();
    }

    handleClick(name, index) {
        console.log(name, index);
        if (this.state.openedPictures.length === 2) {
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
        }
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

    start() {
        let finalizedPictures = [];
        this.state.duplicatedPictures = this.state.pictures.concat(this.state.pictures);
        this.state.randomizedPictures = this.shuffle(this.state.duplicatedPictures);
        this.state.randomizedPictures.map((name, index) => {
            finalizedPictures.push({
                name,
                close: true,
                complete: false,
                fail: false
            });
        });
        this.state.finalizedPictures = finalizedPictures;
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array
    }

    render() {
        return (
            <div>
                <div style={styles.playground}>
                    {
                        this.state.finalizedPictures.map((picture, index) => {
                            return <Card key={index} picture={picture.name} click={() => { this.handleClick(picture.name, index); }} close={picture.close} complete={picture.complete} />;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default GameBoard;