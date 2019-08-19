import React from "react";
import styles from './CardStyles';

export const Card = (props) => {
    const openedStyle = !props.closed ? styles.opened : {};
    const disabledStyle = props.disabled ? styles.matched : {};
    const backColor = props.matched ? 'has-background-warning grey-dark' : 'has-background-success has-text-light';
    return (
        <div style={{ ...styles.card, ...openedStyle, ...disabledStyle }} onClick={props.click} disabled={props.disabled}>
            <div style={{ ...styles.div, ...styles.front }} className="has-background-primary has-text-light">
                ?
            </div>
            <div style={{ ...styles.div, ...styles.back }} className={backColor}>
                <i className={`fas ${props.picture}`}/>
            </div>
        </div>
    );
};