import React from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';

// import gravatar from 'node-gravatar';
// import FontAwesome from 'react-fontawesome';
// import {convertTime} from '../../utils/convertTime';
// import PhoneInfoItem from './PhoneInfoItem.jsx';
// const PhoneInfoItem = (props) => {
const PhoneInfoItem = ({num}) => {

    // convertTime = (ms) => {
    //     var momentTime = moment.utc(ms);
    //     return momentTime.local().format('MMMM Do YYYY, h:mma');
    // }

    renderDeleteButton = (num) => {
        if (num.userId === Meteor.userId()) {
            return (
                <div    className="info-delete"
                        onClick={()=>deleteInfoItem(num._id)}>
                    &#10005;
                </div>
            )
        } else {
            return null;
        }
    }


    return (

        <li className="info-msg">
            <div className="info-wrapper">

                <div>
                    {num.name}
                </div>

                <div>
                    {num.number}
                </div>

            </div>




            {renderDeleteButton(num)}
        </li>
    );
};


// PhoneInfoItem.defaultProps = {};
// PhoneInfoItem.propTypes = {
//     name:        PropTypes.string.isRequired,
//     hndleIptChg: PropTypes.func,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     service:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     todos:       PropTypes.array,
//     isComplete:  PropTypes.bool,
//     id:          PropTypes.number,
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

export default PhoneInfoItem;
