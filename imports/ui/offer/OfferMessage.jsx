import React from 'react';
import PropTypes from 'prop-types';

import gravatar from 'node-gravatar';
import {convertTime, timeAgo} from '../../utils/convertTime';

// import OfferMessage from './OfferMessage.jsx';
// const OfferMessage = (props) => {
const OfferMessage = ({deleteOffer, offer}) => {
    // no lifecycle methods
    // no refs

    // convertTime = (ms) => {
    //     var momentTime = moment.utc(ms);
    //     return momentTime.local().format('MMMM Do YYYY, h:mma');
    // }

    renderAvatar = (offer) => {
        if (offer.avatar) return offer.avatar;
        if (offer.email) return gravatar.get(offer.email);
        return 'http://www.gravatar.com/avatar/5a381dfbadb2290a3610e5e114d311c0?r=G&s=96';
    }

    renderDeleteButton = (offer) => {
        if (offer.userId === Meteor.userId()) {
            return (
                <div    className="offer-delete"
                        onClick={()=>deleteOffer(offer._id)}>
                    &#10005;
                </div>
            )
        } else {
            return null;
        }
    }

    return (

        <div className="offer-listing">
            <div    className="offer-pic">
                {/*<img src={offer.avatar ? offer.avatar : offer.email? gravatar.get(offer.email):'none'} />*/}
                <img src={renderAvatar(offer)} />
            </div>

            <div className="offer-text">
                <span className="offer-details">
                    {offer.screenName} - {offer.address}
                </span>

                <div className="offer-text-body">
                    {offer.body}
                </div>
                <p className="offer-details offer-time">
                    {convertTime(offer.created)} ({timeAgo(offer.created)})
                </p>
                {renderDeleteButton(offer)}
            </div>

        </div>
    );
};


// OfferMessage.defaultProps = {};
// OfferMessage.propTypes = {
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

export default OfferMessage;
