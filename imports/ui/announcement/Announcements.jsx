import React from 'react';
import PropTypes from 'prop-types';

import Masonry from 'react-masonry-component';

var masonryOptions = {
    columnWidth: '.announcement',
    gutter: 20,
    transitionDuration: 300
};

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import draftToHtml from 'draftjs-to-html';

import {Announcements as AnnouncementsArray} from '../../api/announcements';
import AnnouncementHeader from './AnnouncementHeader';

export const Announcements = ({announcements}) => {

    const draft2html = (saveContent) => {
        return draftToHtml(saveContent);
    }

    const renderAnnouncements = () => {
        if (announcements) {
            return announcements.map((ann) => {
                const html = draft2html(JSON.parse(ann.saveContent));
                return (


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
            <div className="masonry-wrapper">
                <Masonry options={masonryOptions}>
                    {announcements ? renderAnnouncements() : '...'}
                </Masonry>
            </div>
        </div>
    );
};


// Announcements.defaultProps = {};
// Announcements.propTypes = {
//     name:        PropTypes.string.isRequired,
//     meteorCall:  PropTypes.func.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

const mapToProps = (props) => {
    Meteor.subscribe('announcements');
    const announcements = AnnouncementsArray
                                .find({}, {sort: {created: -1}})
                                .fetch();
    return {
        announcements
    }
}

export default createContainer( mapToProps, Announcements );

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data