import React from "react";
import styles from './CardStyles';

const Card = (props) => {
    const openedStyle = !props.close ? styles.opened : {};
    const matchedStyle = props.complete ? styles.matched : {};

    return (
        <div style={{ ...styles.card, ...openedStyle, ...matchedStyle }} onClick={props.click}>
            <div style={{ ...styles.div, ...styles.front }} className="has-background-primary has-text-white">
                ?
            </div>
            <div style={{ ...styles.div, ...styles.back }} className="has-background-success has-text-white">
                <i className={`fas ${props.picture}`}/>
            </div>
        </div>
    );
};

export default Card;