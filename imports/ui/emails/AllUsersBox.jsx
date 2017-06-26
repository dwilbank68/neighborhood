import React from 'react';
import PropTypes from 'prop-types';


// import AllEmailsBox from './AllEmailsBox.jsx';
// const AllEmailsBox = (props) => {
const AllEmailsBox = ({emails}) => {
    // no lifecycle methods
    // no refs

    return (
        <div className="all-emails-box">
            {JSON.stringify(emails , null, 2)}
        </div>
    );
};


// AllEmailsBox.defaultProps = {};
// AllEmailsBox.propTypes = {
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

export default AllEmailsBox;
