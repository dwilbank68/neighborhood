import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';

import Gravatar from 'react-gravatar'

// import {createContainer} from 'meteor/react-meteor-data';

// import {Profiles} from '../api/profiles';
// import _ from 'lodash';
import CurrentUser from './CurrentUser';

const style = {
    main: {
        display: 'flex'
    },
    img: {
        borderRadius: '50%',
        height: '30px',
        marginLeft: '5px'
    },
    userDisplay: {
        display: 'flex'
    },
    userDisplaySwitch: {
        width: '100px'
    },
    onlineUser: {
        position: 'relative'
    },
    infoBox: {
        left: '-90px',
        position: 'absolute',
        transition: 'opacity .5s'
    }
}

export class Users extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            onlineUsersOnly:true
            // visibleProfile: null
        }
        // this.handleHover = this.handleHover.bind(this)
        // this.handleLeave = this.handleLeave.bind(this)
    }

    // handleHover(userId) {
    //     this.showProfile(userId);
    // }
    //
    // handleLeave(){
    //     this.hideProfile();
    // }
    //
    // hideProfile(){
    //     this.setState({
    //         visibleProfile: null
    //     })
    // }
    //
    // showProfile(userId){
    //     this.setState({
    //          visibleProfile: userId
    //     })
    // }

    // renderAllUsers() {
    //     const usersRaw = this.props.allUsers;
    //     const profiles = this.props.profiles;
    //     let profile;
    //     return usersRaw.map(user => {
    //         profile = _.omit(profiles[user.id], 'userId', '_id');
    //         return _.merge(user, profile);
    //     })
    // }
    //
    // renderOnlineUsers() {
    //     const usersRaw = this.props.onlineUsers;
    //     const profiles = this.props.profiles;
    //     let profile;
    //     return usersRaw.map(user => {
    //         profile = _.omit(profiles[user.id], 'userId', '_id', 'fullName',
    //             'city', 'emailVisible', 'phone',
    //             'state', 'zipcode');
    //         let userStripped    = _.omit(user, 'email');
    //         let onlineUser = _.merge(userStripped, profile);
    //         return (
    //             <div    className="online-user"
    //                     key={onlineUser.id} >
    //                 <img    src={onlineUser.avatar}
    //                         style={style.img}/>
    //             </div>
    //         )
    //     })
    // }

    renderUsers(){
        if (this.props.users) {
            const allUsers =    this.props.users;
            const onlineUsers = allUsers.filter(u => u.online == true);
            let displayedUsers = this.state.onlineUsersOnly ? onlineUsers : allUsers;
            return displayedUsers.map((user, i) => {
                const img =         <img        src={user.avatar}
                                                style={style.img}/>;
                const gravatar =    <Gravatar   email={user.email ? user.email:''}
                                                size={30}
                                                style={style.img}/>
                return (
                    <div    className='user'
                            key={user.id} >
                        <div    className="user-img">
                            {user.avatar ? img : gravatar}
                        </div>
                        <div className='user-info'>
                            <CurrentUser user={user}/>
                        </div>
                    </div>
                )
            })
        } else {
            return <div>loading...</div>
        }

    }

    render() {
        return (
            <div  style={style.userDisplay}>
                <div    onClick={() => this.setState({
                            onlineUsersOnly: !this.state.onlineUsersOnly
                        })}
                        style={style.userDisplaySwitch}>
                    {this.state.onlineUsersOnly ? 'Online Users' : 'All Users'}
                </div>
                <div style={style.main} >
                    {this.renderUsers()}
                </div>
            </div>
        );
    }
}

// OnlineUsers.defaultProps = {};
// OnlineUsers.propTypes = {
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

// const mapToProps = (props) => {
//     Meteor.subscribe('allUsers');
//     Meteor.subscribe('onlineUsers');
//     Meteor.subscribe('profiles');
//     const allUsers = Meteor.users.find().fetch();
//     const onlineUsers = Meteor.users.find({"status.online": true}).fetch();
//     const profiles = Profiles.find({}).fetch();
//     return {
//         onlineUsers: onlineUsers.map(u => {
//             return {
//                 email: u.emails[0].address,
//                 id: u._id
//             }
//         }),
//         profiles: _.mapKeys(profiles, 'userId')
//         // links: Links.find({}).fetch(),
//         // meteorCall: Meteor.call
//     }
// }

// export default createContainer( mapToProps, Users );
export default Users;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data