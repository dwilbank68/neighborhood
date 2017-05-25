import React from 'react';
import PropTypes from 'prop-types';
import gravatar from 'node-gravatar';

const CurrentUser = ({user}) => {
    if (!user) return <div>...loading</div>;

    renderAvatar = (user) => {
        if (user.avatar) return user.avatar;
        if (user.email) return gravatar.get(user.email).replace('http', 'https');
        return 'https://www.gravatar.com/avatar/5a381dfbadb2290a3610e5e114d311c0?r=G&s=96';
    }

    if (user) {
        const {address, city, state, zipcode,
            fullName, screenName, avatar,
            emailVisible, email, phone} = user;


        return (
            <div className="current-user">
                <div className="userbadge">
                    <div className="userbadge-pic">
                        <img src={renderAvatar(user)} />
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