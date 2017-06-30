import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import _ from 'lodash';

import PrivateHeader        from './PrivateHeader';
import Map                  from './Map';
import ChatBox              from './chat/ChatBox';
import AllUsersBox          from './all_users/AllUsersBox'
import AnnouncementBox      from './announcement/AnnouncementBox';
import HeadlineDisplay      from './announcement/HeadlineDisplay';
import NeedBox              from './need/NeedBox';
import OfferBox             from './offer/OfferBox';
import PhoneInfoBox         from './phone_info/PhoneInfoBox';
import ServiceBox           from './service/ServiceBox';
import Users                from './Users';

import {Announcements}  from '../api/announcements';
import {Messages}       from '../api/messages';
import {Needs}          from '../api/needs';
import {Offers}         from '../api/offers';
import {Services}       from '../api/services';
import {Profiles}       from '../api/profiles';

import setBodyBackground from '../utils/setBodyBackground';

export class Dashboard extends Component {

    componentDidMount() {
        setBodyBackground();
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false
        }
        // this.handleClick = this.handleClick.bind(this)
    }

    render() {

        const allUsers = this.props.allUsers;
        const currentUser = this.props.currentUser;

        if (this.props.announcements) {
            this.headlines = this.props.announcements.map((a) => a.title);
            this.headlines.unshift('HOA Announcements - Click here to visit the full announcements page');
        }

        return (
            <div className="dashboard">

                <PrivateHeader addressUsers={this.props.addressUsers}
                               title=""
                               currentUser={currentUser}/>

                <HeadlineDisplay headlines={this.headlines}/>

                <div className="page-content">
                    <Map className="map"
                         allUsers={allUsers}
                         needs={this.props.needs}
                         offers={this.props.offers}/>

                    <Tabs className='tabs'>
                        <TabList>
                            <Tab>Phone & Info</Tab>
                            <Tab>Users ({allUsers ? allUsers.length:0})</Tab>
                            <Tab>Chat</Tab>
                            <Tab>Services</Tab>
                            <Tab>Rules</Tab>
                            { this.renderAnnouncementTab(currentUser) }
                            { this.allUsersTab(currentUser) }
                            <Tab>Offers {this.props.offers ?
                                <span>({this.props.offers.length})</span> : null}</Tab>
                            <Tab>Requests ({this.props.needs ? this.props.needs.length : null})</Tab>
                        </TabList>

                        <TabPanel>
                            <PhoneInfoBox currentUser={currentUser}/>
                        </TabPanel>

                        <TabPanel>
                            <Users currentUser={currentUser}
                                   serviceCategories={this.props.services}
                                   users={allUsers}/>
                        </TabPanel>

                        <TabPanel>
                            <ChatBox currentUser={currentUser}/>
                        </TabPanel>

                        <TabPanel>
                            <ServiceBox currentUser={currentUser}/>
                        </TabPanel>

                        <TabPanel></TabPanel>

                        { this.renderAnnouncementComponent(currentUser) }

                        { this.allUsersComponent(currentUser) }

                        <TabPanel>
                            <OfferBox currentUser={currentUser}/>
                        </TabPanel>
                        <TabPanel>
                            <NeedBox    currentUser={currentUser}
                                        allUsers={allUsers}/>
                        </TabPanel>

                    </Tabs>
                </div>

            </div>
        );

    }

    allUsersTab(currentUser){
        if (!currentUser) return;
        if (currentUser.admin) {
            return (
                <Tab>Get All Emails</Tab>
            )
        }
    }

    allUsersComponent(currentUser, allUsers){
        if (!currentUser) return;
        if (currentUser.admin) {
            return (
                <TabPanel>
                    <AllUsersBox   allUsers={allUsers}/>
                </TabPanel>
            )
        }
    }

    renderAnnouncementTab(currentUser){
        if (!currentUser) return;
        if (currentUser.admin) {
            return (
                <Tab>Announcements</Tab>
            )
        }
    }

    renderAnnouncementComponent(currentUser){
        if (!currentUser) return;
        if (currentUser.admin) {
            return (
                <TabPanel>
                    <AnnouncementBox announcements={this.props.announcements}
                                     currentUser={currentUser}/>
                </TabPanel>
            )
        }
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
    Meteor.subscribe('announcements');
    Meteor.subscribe('needs');
    Meteor.subscribe('offers');
    Meteor.subscribe('profiles');
    Meteor.subscribe('services');

    const announcements = Announcements.find({}).fetch();
    const services = Services.find({}).fetch();

    const users = Meteor.users
                            .find({}, {sort: {"status.online": 1}})    // 1
                            .fetch();
    const profiles = Profiles.find({}).fetch();

    const needs = Needs.find({}).fetch();
    const offers = Offers.find({}).fetch();
    if (profiles.length > 0 && users.length > 0) {
        const profilesObj = _.mapKeys(profiles, 'userId');
        let profile;
        let mergedUsers = users.map(u => {
            profile = profilesObj[u._id];
            if (profile) {
                const {screenName, fullName, avatar,
                    address, city, state, zipcode,
                    phone, admin, emailVisible,
                    offerNotify, requestNotify,
                } = profile;
                return {
                    screenName, fullName, avatar,
                    address, city, state, zipcode,
                    phone, admin, emailVisible,
                    offerNotify, requestNotify,
                    email: u.emails[0].address,
                    id: u._id,
                    online: u.status ? u.status.online : true
                }
            }
        });
        mergedUsers = mergedUsers.filter(u => u!== undefined);
        try {
            let currentUser = mergedUsers.find(m => m.id == Meteor.userId());
            let addressUsers = Profiles.find({address: currentUser.address}).fetch();
            return {
                addressUsers,
                allUsers: mergedUsers,
                announcements,
                currentUser,
                needs,
                offers,
                services
            }
        } catch (err) {
            console.log('Dashboard.jsx - mapToProps',err);
        }
    } else {
        return [{}];
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

// 1 -  sorted with online users at the bottom, because otherwise, some
//      users who live at the same address who are offline would cause
//      the 'online' class to be turned off