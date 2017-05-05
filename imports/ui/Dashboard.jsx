import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import PrivateHeader from './PrivateHeader';

// import {Users} from '../api/users';

// import Dashboard from './Dashboard.jsx';
// import {Dashboard} from './Dashboard.jsx';
export class Dashboard extends Component {

    // constructor(props, context){
    //     super(props, context);
    //     this.state = {
    //         whatever:{}
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    // }

    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    render() {
        return (
            <div className="dashboard">
                <PrivateHeader title="Dashboard"/>
                <div className="page-content">
                    Dashboard page content
                    <pre><code>{JSON.stringify(this.props.allUsers, null, 2)}</code></pre>
                </div>
            </div>
        );
    }
}

// Dashboard.defaultProps = {};
// Dashboard.propTypes = {
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
    Meteor.subscribe('allUsers');
    const allUsers = Meteor.users.find().fetch();
    return {
        allUsers: allUsers.map(u => {
            return {
                screenname:u.screenname,
                fullname:u.fullname,
                address: u.address,
                id: u._id
            }
        })
        // links: Links.find({}).fetch(),
        // meteorCall: Meteor.call
    }
}

export default createContainer( mapToProps, Dashboard );
// export default Dashboard;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data