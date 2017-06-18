import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import OfferList from './OfferList.jsx';
import OfferInput from './OfferInput.jsx';

import {Offers} from '../../api/offers';

// import {OfferBox} from './OfferBox.jsx';
export class OfferBox extends Component {

    constructor(props, context){
        super(props, context);
            this.state = {
                input:'',
                filterText: ''
            }
        this.handleChange = this.handleChange.bind(this)
        this.handleOfferSubmit = this.handleOfferSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            filterText: e.target.value
        })
    }

    handleOfferSubmit(offer) {
        Meteor.call(
            'offerCreate',
            offer,
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