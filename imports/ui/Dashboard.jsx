import React, {Component} from 'react';

import PropTypes from 'prop-types';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import _ from 'lodash';

import PrivateHeader        from './PrivateHeader';
import Map                  from './Map';
import ChatBox              from './chat/ChatBox';
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

        const currentUser = this.props.currentUser;

        if (this.props.announcements) {
            this.headlines = this.props.announcements.map((a) => a.title);
            this.headlines.unshift('HOA Announcements - Click here to visit the full announcements page');
        }

        return (
            <div className="dashboard">
                {/*<PrivateHeader title="Dashboard" user={user}/>*/}

                <PrivateHeader  addressUsers={this.props.addressUsers}
                                title=""
                                currentUser={currentUser}/>

                <HeadlineDisplay headlines={this.headlines}/>

                <div className="page-content">
                    <Map    className="map"
                            allUsers={this.props.allUsers}
                            needs={this.props.needs}
                            offers={this.props.offers}/>

                    <Tabs className='tabs'>
                        <TabList>
                            <Tab>Phone & Info</Tab>
                            <Tab>Users</Tab>
                            <Tab>Chat ({this.props.messageCount})</Tab>
                            <Tab>Services ({this.props.serviceCount})</Tab>
                            <Tab>Rules</Tab>
                            <Tab>Announcements</Tab>
                            <Tab>For Sale / Giveaway / Offers {this.props.offers? <span>({this.props.offers.length})</span>:null}</Tab>
                            <Tab>Wanted ({this.props.needs? this.props.needs.length:null})</Tab>
                        </TabList>

                        <TabPanel>
                            <PhoneInfoBox currentUser={currentUser}/>
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
                        <TabPanel>
                            <AnnouncementBox announcements={this.props.announcements}
                                             currentUser={currentUser}/>
                        </TabPanel>
                        <TabPanel>
                            <OfferBox        currentUser={currentUser}/>
                        </TabPanel>
                        <TabPanel>
                            <NeedBox         currentUser={currentUser}/>
                        </TabPanel>

                    </Tabs>
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
    Meteor.subscribe('announcements');
    Meteor.subscribe('needs');
    Meteor.subscribe('offers');
    Meteor.subscribe('profiles');
    
    const announcements = Announcements.find({}).fetch();

    const users = Meteor
                    .users
                    .find({},{sort:{"status.online":1}})    // 1
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
                const {emailVisible} = profile;
                return {
                    screenName: profile.screenName,
                    fullName:   profile.fullName,
                    avatar:     profile.avatar,
                    address:    profile.address,
                    city:       profile.city,
                    state:      profile.state,
                    zipcode:    profile.zipcode,
                    phone:      profile.phone,
                    emailVisible,
                    email: emailVisible ? u.emails[0].address : null,
                    id: u._id,
                    online: u.status ? u.status.online : true
                }
            }
        });
        let currentUser = mergedUsers.find(m => m.id == Meteor.userId());
        let addressUsers = Profiles.find({address:currentUser.address}).fetch();
        return {
            addressUsers,
            allUsers: mergedUsers,
            announcements,
            currentUser,
            needs,
            offers
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

// 1 -  sorted with online users at the bottom, because otherwise, some
//      users who live at the same address who are offline would cause
//      the 'online' class to be turned off