import React from "react";
import styles from './CardStyles';

const Card = (props) => {
    const openedStyle = !props.close ? styles.opened : {};
    const disabledStyle = props.disabled ? styles.matched : {};
    const backColor = props.matched ? 'has-background-warning' : 'has-background-success';
    return (
        <div style={{ ...styles.card, ...openedStyle, ...disabledStyle }} onClick={props.click} disabled={props.disabled}>
            <div style={{ ...styles.div, ...styles.front }} className="has-background-primary has-text-white">
                ?
            </div>
            <div style={{ ...styles.div, ...styles.back }} className={`${backColor} has-text-white`}>
                <i className={`fas ${props.picture}`}/>
            </div>
        </div>
    );
};

export default Card;