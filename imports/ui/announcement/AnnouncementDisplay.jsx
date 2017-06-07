import React from 'react';
import PropTypes from 'prop-types';

import draftToHtml from 'draftjs-to-html';

const AnnouncementDisplay = ({announcements}) => {

    const draft2html = (saveContent) => {
        return draftToHtml(saveContent);
    }

    const renderAnnouncements = () => {
        if (announcements) {
            return announcements.map((ann) => {
                const html = draft2html(JSON.parse(ann.saveContent));
                console.log('------------------------------------------');
                console.log('html in display', html);
                console.log('------------------------------------------');
                return (
                    <div    className="announcement"
                            key={ann._id}>
                        <h3>{ann.title}</h3>
                        <div dangerouslySetInnerHTML={{__html: html}}/>
                    </div>
                )
            })
        }
    }

    return (
        <div className="announcement-display">
            {announcements ? renderAnnouncements(): <span>...</span>}
        </div>
    );
};


// AnnouncementDisplay.defaultProps = {};
// AnnouncementDisplay.propTypes = {
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

export default AnnouncementDisplay;
