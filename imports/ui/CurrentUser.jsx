import React from 'react';
import PropTypes from 'prop-types';


// import CurrentUser from './CurrentUser.jsx';
// const CurrentUser = (props) => {
const CurrentUser = (props) => {
    const {address, city, state, zipcode,
        fullName, screenName,
        emailVisible, emails, phone} = props.user;

    return (
        <div className="current-user">
            <p>{fullName} ({screenName})</p>
            <p>{address}</p>
            <p>{city}, {state} {zipcode}</p>
            <p>{phone} {emailVisible ? emails[0].address : null}</p>
        </div>
    );
};


// CurrentUser.defaultProps = {};
// CurrentUser.propTypes = {
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

export default CurrentUser;