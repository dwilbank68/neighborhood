import React from 'react';
import PropTypes from 'prop-types';

import gravatar from 'node-gravatar';
import {convertTime, timeAgo} from '../../utils/convertTime';

// import NeedMessage from './NeedMessage.jsx';
// const NeedMessage = (props) => {
const NeedMessage = ({deleteNeed, need}) => {
    // no lifecycle methods
    // no refs

    // convertTime = (ms) => {
    //     var momentTime = moment.utc(ms);
    //     return momentTime.local().format('MMMM Do YYYY, h:mma');
    // }

    renderAvatar = (need) => {
        if (need.avatar) return need.avatar;
        if (need.email) return gravatar.get(need.email);
        return 'http://www.gravatar.com/avatar/5a381dfbadb2290a3610e5e114d311c0?r=G&s=96';
    }

    renderDeleteButton = (need) => {
        if (need.userId === Meteor.userId()) {
            return (
                <div    className="message-need-delete"
                        onClick={()=>deleteNeed(need._id)}>
                    &#10005;
                </div>
            )
        } else {
            return null;
        }
    }

    return (

        <div className="need-listing">
            <div    className="need-pic">
                {/*<img src={need.avatar ? need.avatar : need.email? gravatar.get(need.email):'none'} />*/}
                <img src={renderAvatar(need)} />
            </div>

            <div className="need-text">
                <span className="need-details">
                    {need.screenName} - {need.address}
                </span>

                <div className="need-text-body">
                    {need.body}
                </div>
                <p className="need-details need-time">
                    {convertTime(need.created)} ({timeAgo(need.created)})
                </p>
                {renderDeleteButton(need)}
            </div>

        </div>
    );
};


// NeedMessage.defaultProps = {};
// NeedMessage.propTypes = {
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

export default NeedMessage;
