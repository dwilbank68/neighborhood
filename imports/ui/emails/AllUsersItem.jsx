import React from 'react';
import PropTypes from 'prop-types';

// import gravatar from 'node-gravatar';
// import FontAwesome from 'react-fontawesome';
// import {convertTime} from '../../utils/convertTime';
// import UserInfoItem from './UserInfoItem.jsx';
// const PhoneInfoItem = (props) => {
const UserInfoItem = ({num}) => {

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
        </li>
    );
};


// UserInfoItem.defaultProps = {};
// UserInfoItem.propTypes = {
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

export default UserInfoItem;
