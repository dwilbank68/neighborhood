import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
// import ChatMessage from './ChatMessage.jsx';
// const ChatMessage = (props) => {
const ChatMessage = ({msg}) => {
    // no lifecycle methods
    // no refs

    convertTime = (ms) => {
        var momentTime = moment.utc(ms);
        return momentTime.format('MMMM Do YYYY, h:mma');
    }

    return (



        <div className="message-chat">

            <div    className="message-chat-pic">
                <img src={msg.avatar} />
            </div>

            <div className="message-chat-text">
                <span className="message-chat-text-sender">
                    {msg.screenName} - {convertTime(msg.created)}
                </span>

                <div className="message-chat-text-body">
                    {msg.body}
                </div>
            </div>

        </div>
    );
};


// ChatMessage.defaultProps = {};
// ChatMessage.propTypes = {
//     name:        PropTypes.string.isRequired,
//     hndleIptChg: PropTypes.func,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     todos:       PropTypes.array,
//     isComplete:  PropTypes.bool,
//     id:          PropTypes.number,
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

export default ChatMessage;
