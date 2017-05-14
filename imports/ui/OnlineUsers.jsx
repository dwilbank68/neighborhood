import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import OnlineUsers from './OnlineUsers.jsx';
class OnlineUsers extends Component {

    // constructor(props, context){
    //     super(props, context);
    //     this.state = {
    //         whatever:{}
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    // }


    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    render() {
        return (
            <div className="online-users">
                OnlineUsers
            </div>
        );
    }
}

// OnlineUsers.defaultProps = {};
// OnlineUsers.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// OnlineUsers.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default OnlineUsers;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class OnlineUsers extends Component {

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
    //         <div className="online-users">
    //         </div>
    //     );
    // }
// }