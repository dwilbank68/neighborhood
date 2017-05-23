import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import gravatar from 'node-gravatar';
import FontAwesome from 'react-fontawesome';
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

    renderReputation = (svc) => {
        if (svc.reputation > 0) {
            return (
                <span className="service-text-reputation">
                    {svc.reputation} happy customers
                </span>
            )
        } else {
            return null;
        }
    }

    renderVoteButtons = (svc) => {
        if (svc.userId !== Meteor.userId()) {
            return (
                <div className="service-thumbs-o-box">
                    <FontAwesome    className="thumbs-o-up"
                                    name='thumbs-o-up'
                                    onClick={()=>vote(svc._id, Meteor.userId())}/>
                </div>
            )
        }
    }

    vote = (svcId, userId) => {
        console.log('------------------------------------------');
        console.log('svcId ',svcId);
        console.log('userId ',userId);
        console.log('------------------------------------------');
    }

    return (

        <li className="service-msg">
            <div    className="service-msg-pic">
                <img src={renderAvatar(svc)} />
            </div>

            <div className="service-text">

                <span className="service-text-sender">
                    {svc.screenName}
                </span>

                {renderReputation(svc)}

            </div>

            <div className="service-categories">
                {svc.categories}
            </div>

            <div className="service-body">{svc.body}</div>

            <div className="service-date">
                {convertTime(svc.created)}
            </div>
            {renderVoteButtons(svc)}
            {renderDeleteButton(svc)}
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
