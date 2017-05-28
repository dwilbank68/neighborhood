import React from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';

import {convertFromRaw, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import htmlToText from 'html-to-text';
import {convertTime} from '../../utils/convertTime';

// import AnnouncementMessage from './AnnouncementMessage.jsx';
// const AnnouncementMessage = (props) => {
const AnnouncementMessage = ({deleteSvc, announcement}) => {

    // renderDeleteButton = (announcement) => {
    //     if (announcement.userId === Meteor.userId()) {
    //         return (
    //             <div    className="announcement-delete"
    //                     onClick={()=>deleteSvc(announcement._id)}>
    //                 &#10005;
    //             </div>
    //         )
    //     } else {
    //         return null;
    //     }
    // }
    const saveContent = JSON.parse(announcement.saveContent);
    const contentState = convertFromRaw(saveContent);
    const html = draftToHtml(saveContent);
    const htmlText = htmlToText.fromString(html)
    // dangerouslySetInnerHTML={{ __html: html }}>

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
                {htmlText}
            </div>



            {/*{renderDeleteButton(announcement)}*/}
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
