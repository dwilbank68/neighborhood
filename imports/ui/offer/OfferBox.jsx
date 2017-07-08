import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import OfferList from './OfferList.jsx';
import OfferInput from './OfferInput.jsx';

import {Offers} from '../../api/offers';

// import {OfferBox} from './OfferBox.jsx';
export class OfferBox extends Component {

    componentDidMount() {
        const offerEmailRecipients = this.props.allUsers
            .filter(u => u.offerNotify === true)
            .map(u => u.email);

        const offerSMSRecipients = this.props.allUsers
            .filter(u => u.offerNotifySMS === true)
            .map(u => u.phone);

        this.setState({
            offerEmailRecipients,
            offerSMSRecipients
        });
    }

    constructor(props, context){
        super(props, context);
            this.state = {
                input:'',
                filterText: '',
                offerEmailRecipients: [],
                offerSMSRecipients: []
            }
        this.handleChange = this.handleChange.bind(this)
        this.handleOfferSubmit = this.handleOfferSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            filterText: e.target.value
        })
    }

    handleOfferSubmit(offerObj) {
        Meteor.call(
            'offerCreate',
            offerObj,
            (err, res) => {
                if (res) {
                    let subject = `${offerObj.screenName} has posted an offer on traditions90250`;
                    Meteor.call(
                        'sendEmail',
                        this.state.offerEmailRecipients, subject, offerObj,
                        (err,res) => {
                            if (err) {console.log('err in sending email', err);}
                        }
                    )
                } else {
                    console.log('err', err);
                }
            }
        )
    }

    render() {
        return (
            <div className="generic-box">
                <div className="generic-filter">
                    <input type="text"
                           onChange={this.handleChange}
                           placeholder="find request by sender or by text"/>
                </div>
                <OfferList      filterText={this.state.filterText}
                                offers={this.props.offers}/>
                <OfferInput     handleOfferSubmit={this.handleOfferSubmit}
                                currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

// OfferBox.defaultProps = {};
// OfferBox.propTypes = {
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
    Meteor.subscribe('offers');
    // const {binId} = props.params;
    return {
        offers: Offers
                .find({}, {sort:{created:-1}})
                .fetch(),
    }
}

export default createContainer( mapToProps, OfferBox );
// export default OfferBox;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data