import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import gravatar from 'node-gravatar';

// import ChatMessage from './ChatMessage.jsx';
// const ChatMessage = (props) => {
const ChatMessage = ({deleteMsg, msg}) => {
    // no lifecycle methods
    // no refs

    convertTime = (ms) => {
        var momentTime = moment.utc(ms);
        return momentTime.local().format('MMMM Do YYYY, h:mma');
    }

    renderAvatar = (msg) => {
        if (msg.avatar) return msg.avatar;
        if (msg.email) return gravatar.get(msg.email);
        return 'http://www.gravatar.com/avatar/5a381dfbadb2290a3610e5e114d311c0?r=G&s=96';
    }

    renderDeleteButton = (msg) => {
        if (msg.userId === Meteor.userId()) {
            return (
                <div    className="message-chat-delete"
                        onClick={()=>deleteMsg(msg._id)}>
                    &#10005;
                </div>
            )
        } else {
            return null;
        }
    }

    return (

        <div className="message-chat">
            <div    className="message-chat-pic">
                {/*<img src={msg.avatar ? msg.avatar : msg.email? gravatar.get(msg.email):'none'} />*/}
                <img src={renderAvatar(msg)} />
            </div>

            <div className="message-chat-text">
                <span className="message-chat-text-sender">
                    {msg.screenName} - {convertTime(msg.created)}
                </span>

                <div className="message-chat-text-body">
                    {msg.body}
                </div>
                {renderDeleteButton(msg)}
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
