import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import PhoneInfoInput from './PhoneInfoInput.jsx';
import PhoneInfoItem from './PhoneInfoItem.jsx';

import {PhoneNumbers} from '../../api/phone_numbers';

const styles = {
    list: {
        background: 'rgba(0,0,0,.15)',
        height: '360px'
    }
}

export class PhoneInfoBox extends Component {

    constructor(props, context){
        super(props, context);
            this.state = {
                input:'',
                filterText: ''
            }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    deletePhoneNumber(numId){
        Meteor.call(
            'phoneNumberDelete',
            numId,
            (err, res) => {
                if (res) {
                    console.log('------------------------------------------');
                    console.log('res in deletePhoneNumber',res);
                    console.log('------------------------------------------');
                } else {
                    console.log('err in deletePhoneNumber', err);
                }
            }
        )
    }

    handleFilterTextChange(e) {
        this.setState({
            filterText: e.target.value
        })
    }


    renderPhoneNumbers(){
        if (this.props.phone_numbers) {
            const phone_numbers = this.props.phone_numbers.filter((n) => {
                return (
                    n.name
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                    ||
                    n.number
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                )
            });
            return phone_numbers.map((num) => {

                return (
                    <PhoneInfoItem  key={num._id}
                                    num={num}
                                    deletePhoneNumber={this.deletePhoneNumber}/>

                )

            })
        } else {
            return <div>loading...</div>
        }

    }

    render() {
        return (
            <div className="generic-box">
                <div className="generic-filter">
                    <input type="text"
                           onChange={this.handleFilterTextChange}
                           placeholder="find by name or number"/>
                </div>

                <div className="generic-list">
                    {this.renderPhoneNumbers()}
                </div>

                <PhoneInfoInput     currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

// PhoneInfoBox.defaultProps = {};
// PhoneInfoBox.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol


// -> this.props.loadCourses, this.props.createCourse

//
// -> this.props.actions.loadCourses();

///////////////////////////// context //////////////////////////////

// ManageCoursePage.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

const mapToProps = (props) => {
    Meteor.subscribe('phone_numbers');
    const phone_numbers = PhoneNumbers.find({}).fetch();
    return {
        phone_numbers
        // meteorCall: Meteor.call
    }
}

export default createContainer( mapToProps, PhoneInfoBox );
// export default PhoneInfoBox;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data