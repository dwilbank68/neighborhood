import React from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';

import {convertFromRaw, convertToRaw} from 'draft-js';

import {convertTime} from '../../utils/convertTime';

// import AnnouncementMessage from './AnnouncementMessage.jsx';
// const AnnouncementMessage = (props) => {
const AnnouncementMessage = ({deleteAnnouncement, announcement}) => {

    renderDeleteButton = (announcement) => {
        if (announcement.userId === Meteor.userId()) {
            return (
                <div    className="announcement-delete"
                        onClick={()=>deleteAnnouncement(announcement._id)}>
                    &#10005;
                </div>
            )
        } else {
            return null;
        }
    }

    return (

        <li className="announcement-msg">
            <div className="sender-date-wrapper">
                <span className="announcement-text-sender">
                    {announcement.screenName}
                </span>
                <span className="announcement-date">
                    {convertTime(announcement.created)}
                </span>
            </div>
            <div className="announcement-text">
                {announcement.title}
            </div>

            {renderDeleteButton(announcement)}
        </li>
    );
};


// AnnouncementMessage.defaultProps = {};
// AnnouncementMessage.propTypes = {
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

export default AnnouncementMessage;
