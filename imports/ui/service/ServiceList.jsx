import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ServiceMessage from './ServiceMessage.jsx';

class ServiceList extends Component {

    constructor(props, context){
        super(props, context);
    //     this.state = {
            messages:[]
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    }

    deleteMsg(msgId){

        Meteor.call(
            'messageDelete',
            msgId,
            (err, res) => {
                if (res) {
                    console.log('------------------------------------------');
                    console.log('res in deleteMsg',res);
                    console.log('------------------------------------------');
                } else {
                    console.log('err in deleteMsg', err);
                }
            }
        )
    }

    renderMessages(){
        if (this.props.messages) {
            const msgList = this.props.messages.map((msg, i) => {
                return (
                    <ServiceMessage key={msg._id} msg={msg} deleteMsg={this.deleteMsg}/>
                )
            });
            return msgList;
        } else {
            return <h3>loading...</h3>
        }

    }

    render() {
        return (
            <div className="service-list">
                {this.renderMessages()}
            </div>
        );
    }

}

// ServiceList.defaultProps = {};
ServiceList.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
    messages:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
};
//
// PropTypes -> array, bool, func, number, object, string, symbol

// ServiceList.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default ServiceList;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class ServiceList extends Component {
    
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
    //         <div className="chat-list">
    //         </div>
    //     );
    // }
// }