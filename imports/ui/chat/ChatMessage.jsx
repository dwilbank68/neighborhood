import React from 'react';
import PropTypes from 'prop-types';


// import ChatMessage from './ChatMessage.jsx';
// const ChatMessage = (props) => {
const ChatMessage = ({msg}) => {
    // no lifecycle methods
    // no refs
    console.log('------------------------------------------');
    console.log('msg in ChatMessage', msg);
    console.log('------------------------------------------');


    return (

        <div className="chat-message">
            {/*<a onClick={methodName}>Do It</a>       // note no need to call 'this'*/}
            {msg.userId} {msg.avatar} - {msg.body}
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
