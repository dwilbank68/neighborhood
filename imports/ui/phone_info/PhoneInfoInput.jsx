import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
    phoneInfoInputWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    phoneInfoInput: {
        marginTop: '9px',
        width: '125px'
    },
    phoneInfoNewButton: {
        cursor: 'pointer',
        textAlign: 'center'
    }
}

// import PhoneInfoInput from './PhoneInfoInput.jsx';
class PhoneInfoInput extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            name:'',
            number:''
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.prepPhoneInfo = this.prepPhoneInfo.bind(this)
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleNumberChange(e) {
        this.setState({
            number: e.target.value
        })
    }

    handlePhoneNumberSubmit(phoneNumber) {
        Meteor.call(
            'phoneNumberCreate',
            phoneNumber,
            (err, res) => {
                if (res) {
                    console.log('------------------------------------------');
                    console.log('res ',res);
                    console.log('------------------------------------------');
                } else {
                    console.log('err', err);
                }
            }
        )
    }

    prepPhoneInfo(e){
        e.preventDefault();
        if (this.state.name == '') return;
        if (this.state.number == '') return;
        const phoneNumber = {
            name: this.state.name,
            number: this.state.number,
            userId: Meteor.userId(),
        }
        this.handlePhoneNumberSubmit(phoneNumber);
        this.setState({name:'', number:''});
    }

    render() {

        return (
            <div className="phone-info-input">
                <div style={styles.phoneInfoInputWrapper}>
                    <input  style={styles.phoneInfoInput}
                            type="text"
                            onChange={this.handleNameChange}
                            placeholder="add name"
                            value={this.state.name}/>
                    <input  style={styles.phoneInfoInput}
                            type="text"
                            onChange={this.handleNumberChange}
                            placeholder="add number"
                            value={this.state.number}/>
                    <div style={styles.phoneInfoNewButton}
                         onClick={this.prepPhoneInfo}>
                        &#10010;
                    </div>
                </div>

            </div>

        );
    }
}

// PhoneInfoInput.defaultProps = {};
// PhoneInfoInput.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// PhoneInfoInput.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');


export default PhoneInfoInput;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class PhoneInfoInput extends Component {

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
//         <div className="service-input">
//         </div>
//     );
// }
// }