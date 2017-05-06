import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import Select from 'react-select';

import {data} from '../../addresses.js';

class SignUp extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            error: '',
            address: ''
        }
       this.onSubmit = this.onSubmit.bind(this)
    }

    onAddressChange(val){
        this.setState({address:val.value})
    }

    onSubmit(e){
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        let fullName = this.refs.fullName.value.trim();
        let screenName = this.refs.screenName.value.trim();


        if (password.length < 8) {
            return this.setState({
                error:'Password must be at least 8 chars long'
            });
        }

        Accounts
            .createUser(
                {email, password, address: this.state.address, fullName, screenName},
                (err) => {
                    if (err) {
                        this.setState({error: err.reason});
                    } else {
                        this.setState({error: ''})
                    }
                }
            );
    }

// <div className="log-in boxed-view">
    // <div className="boxed-view__box">

    render() {

        const options = data.addresses.map((a) => {
            return {value:a, label:a}
        })

        return (
            <div className="sign-up boxed-view">
                <div className="boxed-view__box">
                    <h1>Join</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit ={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="text"      ref="screenName"      name="screenName"     placeholder="Screen Name (Short)"/>
                        <input type="text"      ref="fullName"        name="fullName"       placeholder="Full Name (optional)"/>
                        <input type="email"     ref="email"     name="email"    placeholder="Email"/>
                        <input type="password"  ref="password"  name="password" placeholder="Password"/>
                        <Select className="address"
                                clearable={false}
                                placeholder="Select Your Address"
                                options={options}
                                onChange={ val => this.onAddressChange(val) }/>
                        <p>{this.state.address}</p>
                        <button className="button">Create Account</button>
                    </form>

                    <Link to="/">
                        Already have an account?
                    </Link>
                </div>

            </div>
        );
    }
}

// SignUp.defaultProps = {};
// SignUp.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// SignUp.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default SignUp;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class SignUp extends Component {

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
    //         <div className="sign-up">
    //         </div>
    //     );
    // }
// }