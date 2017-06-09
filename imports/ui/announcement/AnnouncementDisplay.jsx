import React from 'react';
import PropTypes from 'prop-types';

import draftToHtml from 'draftjs-to-html';
import Slider from 'react-slick';

const AnnouncementDisplay = ({announcements}) => {

    const draft2html = (saveContent) => {
        return draftToHtml(saveContent);
    }

    const renderAnnouncements = () => {
        if (announcements) {
            return announcements.map((ann) => {
                const html = draft2html(JSON.parse(ann.saveContent));
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

    const settings = {
        autoplay: true, autoplaySpeed: 2000,
        centerMode:true,
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4
    };

    return (
            <Slider {...settings}>
                {announcements ? renderAnnouncements(): <span>...</span>}
            </Slider>
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
