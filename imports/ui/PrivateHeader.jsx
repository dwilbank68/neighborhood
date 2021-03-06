import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';

import EditProfile from './EditProfile';
import Weather from './Weather.jsx';

import CurrentUser from './CurrentUser';

// import PrivateHeader from './PrivateHeader.jsx';
class PrivateHeader extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            modalOpen:false
        }
       // this.handleClick = this.handleClick.bind(this)
    }


    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    onSubmit(e){
        e.preventDefault();
        this.setState({modalOpen: false});
    }

    render() {
        const {currentUser} = this.props;
        return (
            <div className="private-header header">
                <div className="header__content">
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <img    className="logo-img"
                                src="/images/traditions-logo.svg" alt=""/>
                        <Weather/>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <EditProfile    addressUsers={this.props.addressUsers}
                                        currentUser={currentUser}/>
                        <button onClick={() => Accounts.logout()}
                                className="button button--link--header">
                            Log Out
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

// PrivateHeader.defaultProps = {};
PrivateHeader.propTypes = {
    title:  PropTypes.string.isRequired
    // user:   PropTypes.object.isRequired
};
// PrivateHeader.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// PrivateHeader.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default PrivateHeader;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class PrivateHeader extends Component {

    // this.state = {
    //     'whatever':{}
    // }

    // handleSubmit = (e) => {
    //    ...
    //    this.setState({
    //        ...
    //    })
    // }

    // render() {
    //     return (
    //         <div className="private-header">
    //         </div>
    //     );
    // }
// }