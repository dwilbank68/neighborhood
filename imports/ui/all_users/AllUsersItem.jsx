import React from 'react';
import PropTypes from 'prop-types';

// import gravatar from 'node-gravatar';
// import FontAwesome from 'react-fontawesome';
// import {convertTime} from '../../utils/convertTime';
// import AllUsersItem from './AllUsersItem.jsx';
// const PhoneInfoItem = (props) => {
const styles = {
    p: {
        marginBottom: '2px'
    },
    wrapper: {
        color: 'white',
        fontSize: '.75em',
        marginLeft: '10px'
    }
}

const AllUsersItem = ({user}) => {

    return (

        <li className="info-msg">
            <div style={styles.wrapper}>
                <p style={styles.p}>
                    {user.fullName ? user.fullName : user.screenName}
                </p>
                <p style={styles.p}>{user.address}</p>
                <p style={styles.p}>{user.city}, {user.state} {user.zipcode}</p>
                <p style={styles.p}>{user.phone} {user.email}</p>
            </div>
        </li>
    );
};


// AllUsersItem.defaultProps = {};
// AllUsersItem.propTypes = {
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

export default AllUsersItem;
