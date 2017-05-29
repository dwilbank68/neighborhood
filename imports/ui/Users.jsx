import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';

import gravatar from 'node-gravatar';

import Masonry from 'react-masonry-component';

var masonryOptions = {
    transitionDuration: 300
};
// import {createContainer} from 'meteor/react-meteor-data';

// import {Profiles} from '../api/profiles';
// import _ from 'lodash';
import CurrentUser from './CurrentUser';

const style = {
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
            filterText: '',
            selectedUser: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            filterText: e.target.value
        })
    }

    handleClick(userId) {
        this.showProfile(userId);
    }

    showProfile(userId){
        const selectedUser = this.props.users.find(u => u.id == userId);
        this.setState({
             selectedUser
        })
    }

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

    renderAvatar(user){
        if (user.avatar) return user.avatar;
        if (user.email) return gravatar.get(user.email).replace('http:','https:');
        return 'https://www.gravatar.com/avatar/5a381dfbadb2290a3610e5e114d311c0?r=G&s=96';
    }

    renderUsers(){
        if (this.props.users) {
            const allUsers = this.props.users.filter((u) => {
                return (
                    u.screenName
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                    ||
                    u.fullName
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                    ||
                    u.address
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                )
            });
            return allUsers.map((user, i) => {

                return (
                    <div    className='user'
                            key={user.id}
                            onClick={() => this.handleClick(user.id)}>

                        <div className="user-img">
                            <img    src={this.renderAvatar(user)}
                                    style={style.img}/>
                        </div>
                        <div className="user-short-name">
                            {user.screenName}
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
            <div className="user-display" >

                <div className="user-filter">
                    <input type="text"
                            onChange={this.handleChange}
                            placeholder="find by name or addresses"/>
                </div>

                <div className="user-list" >
                    <Masonry options={masonryOptions}>
                        {this.renderUsers()}
                    </Masonry>
                </div>

                <div>
                    <CurrentUser user={
                        this.state.selectedUser ?
                            this.state.selectedUser :
                            this.props.currentUser
                    }/>
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