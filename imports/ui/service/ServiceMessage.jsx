import React from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';


import moment from 'moment';
import gravatar from 'node-gravatar';
import FontAwesome from 'react-fontawesome';
// import ServiceMessage from './ServiceMessage.jsx';
// const ServiceMessage = (props) => {
const ServiceMessage = ({deleteSvc, svc}) => {

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
        const length = svc.reputation.length;
        if (length > 0) {
            const units = (length > 1 ? 'customers':'customer');
            return (
                <span className="service-text-reputation">
                    {svc.reputation.length} happy {units}
                </span>
            )
        } else {
            return null;
        }
    }

    renderThumbsUp = (svc) => {
        if (svc.userId !== Meteor.userId()) {
            return (
                <FontAwesome    className="thumbs-o-up"
                                name='thumbs-o-up'
                                onClick={()=>vote(svc)}/>
            )
        }
    }

    vote = (svc) => {
        Meteor.call(
            'serviceVote',
            svc,
            (err, res) => {
                if (res) {
                    console.log('------------------------------------------');
                    console.log('res in serviceVote',res);
                    console.log('------------------------------------------');
                } else {
                    console.log('err in serviceVote', err);
                }
            }
        )
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

                {renderThumbsUp(svc)}

            </div>

            <div className="service-categories">
                {svc.categories}
            </div>

            <div className="service-body">
                {svc.body}
            </div>

            <div className="service-date">
                {convertTime(svc.created)}
            </div>

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
