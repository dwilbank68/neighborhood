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

    deleteSvc(svcId){

        Meteor.call(
            'serviceDelete',
            svcId,
            (err, res) => {
                if (res) {
                    console.log('------------------------------------------');
                    console.log('res in deleteSvc',res);
                    console.log('------------------------------------------');
                } else {
                    console.log('err in deleteSvc', err);
                }
            }
        )
    }

    renderServices(){
        if (this.props.services) {
            const svcList = this.props.services.map((svc, i) => {
                return (
                    <ServiceMessage key={svc._id} svc={svc} deleteSvc={this.deleteSvc}/>
                )
            });
            return svcList;
        } else {
            return <h3>loading...</h3>
        }

    }

    render() {
        return (
            <ul className="service-list">
                {this.renderServices()}
            </ul>
        );
    }

}

// ServiceList.defaultProps = {};
ServiceList.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
    Services:    PropTypes.arrayOf(React.PropTypes.object),
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