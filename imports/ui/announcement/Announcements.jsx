import React from 'react';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';

import AnnouncementHeader from './AnnouncementHeader';

import {Meteor} from 'meteor/meteor';
// import Announcements from './Announcements.jsx';
// const Announcements = (props) => {
const Announcements = ({whatever1, whatever2}) => {
    // no lifecycle methods
    // no refs

    const methodName = (e) => {
        //
    }

    const draft2html = (saveContent) => {
        return draftToHtml(saveContent);
    }

    const renderAnnouncements = () => {
        if (this.props.announcements) {
            return this.props.announcements.map((ann) => {
                const html = this.draft2html(JSON.parse(ann.saveContent));
                return (
                    // <div    className="announcement"
                    //         key={ann._id}>
                    //     <h3>{ann.title}</h3>
                    //     <div dangerouslySetInnerHTML={{__html: html}}/>
                    // </div>
                    <div    className="announcement"
                            dangerouslySetInnerHTML={{__html: html}}
                            key={ann._id}/>

                )
            })
        }
    }

    return (
        <div className="announcements">
            <AnnouncementHeader  title=""/>
            Announcements are here
        </div>
    );
};


// Announcements.defaultProps = {};
// Announcements.propTypes = {
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

export default Announcements;
