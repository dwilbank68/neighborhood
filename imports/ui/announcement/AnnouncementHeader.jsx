import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

// import AnnouncementHeader from './AnnouncementHeader.jsx';
class AnnouncementHeader extends Component {

    render() {
        return (
            <div className="private-header header">
                <div className="header__content">
                    <h1 className="header__title">{this.props.title}</h1>
                    <Link to="/dashboard">Back to main page</Link>
                    <button onClick={() => Accounts.logout()}
                            className="button button--link--header">
                        Log Out
                    </button>
                </div>

            </div>
        );
    }
}

// AnnouncementHeader.defaultProps = {};
AnnouncementHeader.propTypes = {
    title:  PropTypes.string.isRequired
    // user:   PropTypes.object.isRequired
};
// AnnouncementHeader.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// AnnouncementHeader.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default AnnouncementHeader;