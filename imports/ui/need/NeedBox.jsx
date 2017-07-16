import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import NeedList from './NeedList.jsx';
import NeedInput from './NeedInput.jsx';

import {Needs} from '../../api/needs';

// import {NeedBox} from './NeedBox.jsx';
export class NeedBox extends Component {

    componentDidMount() {
        const requestEmailRecipients = this.props.allUsers
            .filter(u => u.requestNotify === true)
            .map(u => u.email);

        const requestSMSRecipients = this.props.allUsers
            .filter(u => u.requestNotifySMS === true)
            .map(u => u.phone);

        this.setState({
            requestEmailRecipients,
            requestSMSRecipients
        });
    }


    constructor(props, context){
        super(props, context);
            this.state = {
                input:'',
                filterText: '',
                requestEmailRecipients: [],
                requestESMSRecipients: []
            }
        this.handleChange = this.handleChange.bind(this)
        this.handleNeedSubmit = this.handleNeedSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            filterText: e.target.value
        })
    }

    handleNeedSubmit(needObj) {
        Meteor.call(
            'needCreate',
            needObj,
            (err, res) => {
                if (res) {
                    const urgent = needObj.urgent ? 'an urgent' : 'a';
                    let subject = `${needObj.screenName} has posted ${urgent} request on traditions90250`;
                    if (this.state.requestEmailRecipients.length > 0) {
                        Meteor.call(
                            'sendEmail',
                            this.state.requestEmailRecipients, subject, needObj,
                            (err,res) => {
                                if (err) {console.log('err in sending email', err);}
                            }
                        )
                    }
                    if (this.state.requestSMSRecipients.length > 0) {
                        Meteor.call(
                            'sendSMS',
                            this.state.requestSMSRecipients, subject, needObj,
                            (err,res) => {
                                if (err) {console.log('err in sending SMS', err);}
                            }
                        )
                    }
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
                <NeedList   filterText={this.state.filterText}
                            needs={this.props.needs}/>
                <NeedInput  handleNeedSubmit={this.handleNeedSubmit}
                            currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

// NeedBox.defaultProps = {};
// NeedBox.propTypes = {
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
    Meteor.subscribe('needs');
    // const {binId} = props.params;
    return {
        needs: Needs.find({}, {sort:{created:-1}})
                    .fetch(),
    }
}

export default createContainer( mapToProps, NeedBox );
// export default NeedBox;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data