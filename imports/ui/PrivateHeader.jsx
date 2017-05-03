import React, { PropTypes } from 'react';
import {Accounts} from 'meteor/accounts-base';

const PrivateHeader = ({title}) => {

    return (
        <div className="private-header header">
            <div className="header__content">
                <h1 className="header__title">{title}</h1>
                <button onClick={() => Accounts.logout()}
                        className="button button--link">
                    Log Out
                </button>
            </div>

        </div>
    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
};


export default PrivateHeader;

