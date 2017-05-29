import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Draggable from 'react-draggable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import _ from 'lodash';

import AnnouncementDisplay  from './announcement/AnnouncementDisplay';
import PrivateHeader        from './PrivateHeader';
import ChatBox              from './chat/ChatBox';
import AnnouncementBox      from './announcement/AnnouncementBox';
import ServiceBox           from './service/ServiceBox';
import Users                from './Users';

import {Messages} from '../api/messages';
import {Services} from '../api/services';
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


    countServices(){

    }

    render() {

        const currentUser = this.props.currentUser;

        return (
            <div className="dashboard">
                {/*<PrivateHeader title="Dashboard" user={user}/>*/}

                <PrivateHeader  title=""
                                currentUser={currentUser}/>

                <div className="page-content">
                    <div className="left-column">
                        {/*<pre><code>{JSON.stringify(this.renderUsers(), null, 2)}</code></pre>*/}
                        {/*<pre><code>{JSON.stringify(this.renderOnlineUsers(), null, 2)}</code></pre>*/}
                    </div>
                    <Draggable>
                        <div className="right-column">

                            <Tabs>

                                <TabList>
                                    <Tab>Phone & Info</Tab>
                                    <Tab>Users</Tab>
                                    <Tab>Chat ({this.props.messageCount})</Tab>
                                    <Tab>Services ({this.props.serviceCount})</Tab>
                                    <Tab>Offers</Tab>
                                    <Tab>Rules</Tab>
                                    <Tab>Announcements</Tab>
                                    <Tab>Wanted</Tab>
                                </TabList>

                                <TabPanel>
                                    Phone & Info
                                </TabPanel>

                                <TabPanel>
                                    <Users  currentUser={currentUser}
                                            users={this.props.allUsers} />
                                </TabPanel>
                                <TabPanel>
                                    <ChatBox currentUser={currentUser}/>
                                </TabPanel>
                                <TabPanel>
                                    <ServiceBox currentUser={currentUser}/>
                                </TabPanel>
                                <TabPanel></TabPanel>
                                <TabPanel></TabPanel>
                                <TabPanel>
                                    <AnnouncementBox currentUser={currentUser}/>
                                </TabPanel>
                                <TabPanel></TabPanel>

                            </Tabs>

                        </div>

                    </Draggable>

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
    Meteor.subscribe('profiles');
    const users = Meteor.users.find().fetch();
    const profiles = Profiles.find({}).fetch();
    if (profiles.length > 0 && users.length > 0) {
        const profilesObj = _.mapKeys(profiles, 'userId');
        let profile;
        let mergedUsers = users.map(u => {
            profile = profilesObj[u._id];
            const { screenName, emailVisible, fullName, avatar,
                address, city, state, zipcode, phone } = profile;
            return {
                screenName, fullName, avatar, address, city, state, zipcode, phone, emailVisible,
                email: emailVisible ? u.emails[0].address : null,
                id: u._id,
                online: u.status ? u.status.online : true
            }
        });
        let currentUser = mergedUsers.find(m => m.id == Meteor.userId());
        return {
            allUsers: mergedUsers,
            currentUser
        }
    } else {
        return [{}];
    }
//
//
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