import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import _ from 'lodash';

import PrivateHeader from './PrivateHeader';
import ChatBox from './chat/ChatBox';

import {Profiles} from '../api/profiles';


export class Dashboard extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false
        }
        // this.handleClick = this.handleClick.bind(this)
    }

    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    render() {
        // let user = _.omit(Meteor.user(), 'status');
        const profile = _.omit(this.props.profiles[Meteor.userId()], '_id', 'status');
        // user = _.merge(user, profile);
        return (
            <div className="dashboard">
                {/*<PrivateHeader title="Dashboard" user={user}/>*/}
                <PrivateHeader title=""/>
                <div className="page-content">

                    <div className="left-column">
                        all users
                        <pre><code>{JSON.stringify(this.renderUsers(), null, 2)}</code></pre>
                        <pre><code>{JSON.stringify(this.renderOnlineUsers(), null, 2)}</code></pre>
                    </div>
                    <div className="right-column">
                        <ChatBox profile={profile}/>
                    </div>

                </div>
            </div>
        );
    }

    renderOnlineUsers() {
        const usersRaw = this.props.onlineUsers;
        const profiles = this.props.profiles;
        let profile;
        return usersRaw.map(user => {
            profile = _.omit(profiles[user.id], 'userId', '_id', 'fullName',
                                                'city', 'emailVisible', 'phone',
                                                'state', 'zipcode');
            let userStripped    = _.omit(user, 'email');
            return _.merge(userStripped, profile);
        })
    }

    renderUsers() {
        const usersRaw = this.props.allUsers;
        const profiles = this.props.profiles;
        let profile;
        return usersRaw.map(user => {
            profile = _.omit(profiles[user.id], 'userId', '_id');
            return _.merge(user, profile);
        })
        // console.log('------------------------------------------');
        // console.log('users in renderUsers',users);
        // console.log('------------------------------------------');
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
    Meteor.subscribe('onlineUsers');
    Meteor.subscribe('profiles');
    const allUsers = Meteor.users.find().fetch();
    const onlineUsers = Meteor.users.find({"status.online": true}).fetch();
    const profiles = Profiles.find({}).fetch();
    return {
        allUsers: allUsers.map(u => {
            return {
                email: u.emails[0].address,
                id: u._id
            }
        }),
        onlineUsers: onlineUsers.map(u => {
            return {
                email: u.emails[0].address,
                id: u._id
            }
        }),
        profiles: _.mapKeys(profiles, 'userId')
        // links: Links.find({}).fetch(),
        // meteorCall: Meteor.call
    }
}

export default createContainer(mapToProps, Dashboard);
// export default Dashboard;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data