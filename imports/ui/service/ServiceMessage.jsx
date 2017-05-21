import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import gravatar from 'node-gravatar';

// import ServiceMessage from './ServiceMessage.jsx';
// const ServiceMessage = (props) => {
const ServiceMessage = ({deleteSvc, svc}) => {
    // no lifecycle methods
    // no refs

    convertTime = (ms) => {
        var momentTime = moment.utc(ms);
        return momentTime.local().format('MMMM Do YYYY, h:mma');
    }

    renderAvatar = (svc) => {
        if (svc.avatar) return svc.avatar;
        if (svc.email) return gravatar.get(svc.email);
        return 'http://www.gravatar.com/avatar/5a381dfbadb2290a3610e5e114d311c0?r=G&s=96';
    }

    renderDeleteButton = (svc) => {
        if (svc.userId === Meteor.userId()) {
            return (
                <div    className="service-delete"
                        onClick={()=>deleteSvc(svc._id)}>
                    &#10005;
                </div>
            )
        } else {
            return null;
        }
    }

    return (

        <li className="service-msg">
            <div    className="service-msg-pic">
                {/*<img src={svc.avatar ? svc.avatar : svc.email? gravatar.get(svc.email):'none'} />*/}
                <img src={renderAvatar(svc)} />
            </div>

            <div className="service-text">
                <span className="service-text-sender">
                    {svc.screenName} - {convertTime(svc.created)}
                </span>

                <div className="service-text-body">
                    {svc.body}
                </div>
                {renderDeleteButton(svc)}
            </div>

        </li>
    );
};


// ServiceMessage.defaultProps = {};
// ServiceMessage.propTypes = {
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

export default ServiceMessage;
