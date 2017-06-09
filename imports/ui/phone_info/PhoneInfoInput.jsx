import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Modal from 'react-modal';


import {serviceCategories} from '../../../serviceCategories.js';

const placeholderText = `You can either:

1. Choose one category and create a separate post for each skill.
2. Choose multiple categories and describe them all in a single post.

The hope for this feature is that you advertise your services either for barter, or for considerably less cost than providers outside the neighborhood.

If there is a service category not included here, choose Miscellaneous, notify the webmaster, and the category will be added.`;

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
        this.prepService = this.prepService.bind(this)
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

    prepService(e){
        e.preventDefault();
        if (this.state.input == '') {
            return;
        }
        const currentUser = this.props.currentUser;
        const svc = {
            avatar: currentUser.avatar,
            categories: this.state.categories.replace(',', '\n'),
            body: this.state.input,
            email: currentUser.email,
            reputation: 0,
            userId: Meteor.userId(),
            screenName: currentUser.screenName
        }
        this.props.handleSvcSubmit(svc);
        this.setState({input:'', categories:'', modalOpen: false});
    }

    render() {

        const options = serviceCategories.categories.map((a) => {
            return {value:a, label:a}
        })

        const modalStyle = {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        }

        return (
            <div className="service-input">

                <div    className="service-new-button"
                        onClick={this.handleOpenModal}>
                    <p>Add Your Skill / Expertise</p> <span>&#10010;</span>
                </div>

                <Modal  closeTimeoutMS={200}
                        isOpen={this.state.modalOpen}
                        contentLabel="Add Skills Or Expertise You Have To Offer"
                        style={modalStyle}>

                    <h2 className="modal-title">Describe Skills Or Expertise You Have To Offer</h2>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form>
                        <div className="service-input-box">
                            <Select className="category"
                                    multi joinValues simpleValue
                                    placeholder="Select One Or More Categories (Type here to filter the choices)"
                                    options={options}
                                    onChange={ this.onCategoryChange }
                                    value={this.state.categories}/>
                            <textarea   className="service-input-input"
                                        onChange={this.handleInputChange}
                                        placeholder={placeholderText}
                                        value={this.state.input}/>
                            <button   className="modal-submit-button"
                                      onClick={this.prepService}>
                                Submit
                            </button>
                        </div>
                    </form>

                    <div className='button-cancel'
                         onClick={() => this.setState({
                             modalOpen:false,
                             categories: '',
                             input: ''
                         })}>
                        &#x2715;
                    </div>

                </Modal>

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