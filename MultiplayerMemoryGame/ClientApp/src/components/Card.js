import React from "react";
import styles from './CardStyles';

const Card = (props) => {
    const openedStyle = !props.close ? styles.opened : {};
    const matchedStyle = props.complete ? styles.matched : {};

    return (
        <div style={{...styles.card, ...openedStyle, ...matchedStyle}}>
            <div style={{ ...styles.div, ...styles.front }} className="has-background-primary has-text-white">
                ?
            </div>
            <div style={{ ...styles.div, ...styles.back }}>
                !
            </div>
        </div>
    );
};

export default Card;