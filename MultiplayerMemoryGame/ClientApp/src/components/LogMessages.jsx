import React from 'react';
import { connect } from 'react-redux';

const LogMessages = ({ messages }) => {
    return (
        <div>
            <p className="is-size-3">Log Messages</p>
            {
                messages.map((message, index) =>
                    <div>
                        <span>{message}</span>
                    </div>
                )
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        messages: state.reducer.logMessages
    };
};

export const ConnectedLogMessages = connect(mapStateToProps)(LogMessages);