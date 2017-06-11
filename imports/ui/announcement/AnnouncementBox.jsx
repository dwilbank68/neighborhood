import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import AnnouncementInput from './AnnouncementInput.jsx';
import AnnouncementMessage from './AnnouncementMessage.jsx';

export class AnnouncementBox extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            input:'',
            filterText: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAnnouncementSubmit = this.handleAnnouncementSubmit.bind(this)
    }

    deleteAnnouncement(annId){

        Meteor.call(
            'announcementDelete',
            annId,
            (err, res) => {
                if (res) {
                    console.log('------------------------------------------');
                    console.log('res in deleteAnnouncement',res);
                    console.log('------------------------------------------');
                } else {
                    console.log('err in deleteAnnouncement', err);
                }
            }
        )
    }

    handleChange(e) {
        this.setState({
            filterText: e.target.value
        })
    }

    handleAnnouncementSubmit(announcement) {
        console.log('------------------------------------------');
        console.log('announcement in AnnouncementBox',announcement);
        console.log('------------------------------------------');
        Meteor.call(
            'announcementCreate',
            announcement,
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

    renderAnnouncements(){
        if (this.props.announcements) {
            const anns = this.props.announcements.filter( a => {
                return (
                    a.screenName
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                    ||
                    a.title
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                    ||
                    a.plainText
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                )
            });
            return anns.map((ann) => {

                return (
                    <AnnouncementMessage    announcement={ann}
                                            deleteAnnouncement={this.deleteAnnouncement}
                                            key={ann._id}/>
                )

            })
        } else {
            return <div>loading...</div>
        }

    }

    render() {
        return (
            <div className="generic-box">
                <div className="generic-filter">
                    <input type="text"
                           onChange={this.handleChange}
                           placeholder="find by title or content"/>
                </div>

                <div className="announcement-list">
                    {this.renderAnnouncements()}
                </div>

                <AnnouncementInput  handleAnnouncementSubmit={this.handleAnnouncementSubmit}
                                    currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

// AnnouncementBox.defaultProps = {};
// AnnouncementBox.propTypes = {
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
    // Meteor.subscribe('announcements');
    // const announcements = Announcements.find({}).fetch();
    // return {
    //     announcements
    // }
// }

// export default createContainer( mapToProps, AnnouncementBox );
export default AnnouncementBox;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data