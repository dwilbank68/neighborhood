import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import OfferInput from './OfferInput.jsx';
class OfferInput extends Component {

    constructor(props, context){
        super(props, context);
            this.state = {
                input:''
            }
       this.handleInputChange = this.handleInputChange.bind(this)
       this.prepMessage = this.prepMessage.bind(this)
    }


    handleInputChange(e) {
        this.setState({
            input: e.target.value
        })
    }

    prepMessage(e){
        e.preventDefault();
        if (this.state.input == '') {
            return;
        }
        const currentUser = this.props.currentUser;
        const offer = {
            address: currentUser.address,
            avatar: currentUser.avatar,
            body: this.state.input,
            email: currentUser.email,
            userId: Meteor.userId(),
            screenName: currentUser.screenName
        }
        this.props.handleOfferSubmit(offer);
        this.setState({input:''});
    }

    render() {
        return (
            <form   className="generic-input" >
                <div className="chat-input-box">
                    <input      className="chat-input-input"
                                onChange={this.handleInputChange}
                                value={this.state.input}/>
                    <button   className="chat-input-button"
                            onClick={this.prepMessage}>
                        &#x27A4;
                    </button>
                </div>
            </form>
        );
    }
}

// OfferInput.defaultProps = {};
// OfferInput.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// OfferInput.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');


export default OfferInput;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class OfferInput extends Component {

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
    //         <div className="chat-input">
    //         </div>
    //     );
    // }
// }