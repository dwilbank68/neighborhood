import React from 'react';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar'

const CurrentUser = ({user}) => {
    if (!user) return <div>...loading</div>;
    if (user) {
        const {address, city, state, zipcode,
            fullName, screenName, avatar,
            emailVisible, email, phone} = user;

        const img = <img    src={avatar} />;
        const gravatar = <Gravatar   email={email ? email:''}
                                     size={70}/>
        return (
            <div className="current-user">
                <div className="userbadge">
                    <div className="userbadge-pic">
                        {avatar ? img : gravatar}
                    </div>
                    <div className="userbadge-body">
                        <p>{screenName} {fullName ? '(' + fullName + ')' : null}</p>
                        <p>{address}</p>
                        <p>{city}, {state} {zipcode}</p>
                        <p>{phone ? phone : '(phone private)'}</p>
                        <p>{emailVisible ? email : '(email private)'}</p>
                    </div>
                </div>

            </div>
        );
    }


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