import React from "react";
import Card from "./Card";

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: ['cat', 'dog', 'mice', 'bird'],
            duplicatedPictures: [],
            randomizedPictures: [],
            finilizedPictures: [],
            openedPictures: []
        };
        this.start();
    }

    handleClick(name, index) {
        if (this.state.openedPictures.length == 2) {
            setTimeout(() => {
                this.check();
            }, 750);
        } else {
            let picture = {
                name,
                index
            };
            let finalizedPictures = this.state.finilizedPictures;
            let pictures = this.state.openedPictures;
            finalizedPictures[index].close = false;
            pictures.push(picture);
            this.setState({
                openedPictures: pictures,
                finilizedPictures: finalizedPictures
            });
            if(this.state.openedPictures.length == 2) {
                setTimeout(() => {
                    this.check()
                },750)
            }
        }
    }

    check() {
        let finalizedPictures = this.state.finilizedPictures;
        if ((this.state.openedPictures[0].name == this.state.openedPictures[1].name) &&
            (this.state.openedPictures[0].name != this.state.openedPictures[1].index)) {
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
                <h1>Game Board</h1>
                <div className="playground">
                    {
                        this.state.finalizedPictures.map((picture, index) => {
                            return <Card picture={picture.name} click={() => { this.handleClicl(picture.name, index); }} close={picture.close} complete={picture.complete} />;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default GameBoard;