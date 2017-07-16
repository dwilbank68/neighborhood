import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import {Meteor} from 'meteor/meteor';
// import {createContainer} from 'meteor/react-meteor-data';

import Toggle from 'react-toggle'

import _ from 'lodash';

import ImageUpload from './ImageUpload';
import CurrentUser from './CurrentUser';

const styles = {
    toggleLabel: {
        fontFamily: 'Lato, sans-serif',
        fontSize: '.9em',
        fontWeight: '400',
        marginLeft: '14px'
    },
    toggleWrapper: {
        display: 'flex',
        marginBottom: '5px'
    }
}

// import EditProfile from './EditProfile.jsx';
// import {EditProfile} from './EditProfile.jsx';
export class EditProfile extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            error: '',
            // avatar: this.props.profile.avatar ? this.props.profile.avatar : 'http://www.avatarsdb.com/avatars/cat_comp.gif',
            // emailVisible: user.emailVisible,
            avatar:'',
            fullName:'',
            modalOpen:false,
            phone:'',
            screenName:''
        }
        this.formSubmit =               this.formSubmit.bind(this)
        this.handleAvatarChange =       this.handleAvatarChange.bind(this)
        this.handleFullNameChange =     this.handleFullNameChange.bind(this)
        this.handleOpenModal =          this.handleOpenModal.bind(this)
        this.handlePhoneChange =        this.handlePhoneChange.bind(this)
        this.handleScreenNameChange =   this.handleScreenNameChange.bind(this)
    }

    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    formSubmit(e){
        e.preventDefault();
        let userId = Meteor.userId();
        Meteor.call(
            'profileUpdate',
            userId,
            {
                address:            this.state.address,
                avatar:             this.state.avatar,
                emailVisible:       this.state.emailVisible,
                fullName:           this.state.fullName,
                offerNotify:        this.state.offerNotify,
                offerNotifySMS:     this.state.offerNotifySMS,
                requestNotify:      this.state.requestNotify,
                requestNotifySMS:   this.state.requestNotifySMS,
                phone:              this.state.phone,
                screenName:         this.state.screenName
            },
            (err, res) => {
                if (!err) {
                    this.setState({
                        error: '',
                        modalOpen:false
                    })
                } else {
                    this.setState({
                        error: err.reason
                    });
                }
            }
        )
    }

    handleAvatarChange(avatarUrl, public_id){
        // public_id for use only if I decide to use cloudinary's react sdk
        this.setState({
            avatar:avatarUrl,
            public_id
        })
    }

    handleFullNameChange(e){
        const fullName = e.target.value;
        this.setState({fullName});
    }

    handleOpenModal(){
        const {
            address, avatar, city, email, emailVisible,
            fullName, offerNotify, offerNotifySMS, phone,
            requestNotify, requestNotifySMS, screenName, state, zipcode
        } = this.props.currentUser;
        this.setState({
            address, avatar, city, email, emailVisible,
            fullName, offerNotify, offerNotifySMS ,phone,
            requestNotify, requestNotifySMS, screenName, state, zipcode,
            modalOpen: true
        });
    }

    handlePhoneChange(e){
        const phone = e.target.value;
        this.setState({phone});
    }

    handleScreenNameChange(e){
        const screenName = e.target.value;
        this.setState({screenName});
    }

    render() {
        let user = _.omit(Meteor.user(), 'status');
        const profile = _.omit(this.props.prof, 'userId', '_id', 'status');
        user = _.merge(user, profile);

        const modalStyle = {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        // const {fullName, screenName, avatar, phone} = this.props.prof;

        return (
            <div className="edit-profile">

                <div    className="edit-profile-click"
                        onClick={this.handleOpenModal}>
                    <CurrentUser    addressUsers={this.props.addressUsers}
                                    user={this.props.currentUser}/>
                    <div className="overlay">
                        <div className="overlay-text">
                            Edit
                        </div>
                    </div>
                </div>

                <Modal  closeTimeoutMS={200}
                        isOpen={this.state.modalOpen}
                        contentLabel="Update Your User Info"
                        style={modalStyle}>
                    <div className="modal-content-wrapper">
                        <h2 className="modal-title">Update Your User Info</h2>

                        {this.state.error ? <p>{this.state.error}</p> : undefined}

                        <form onSubmit={this.onSubmit}>
                            <div className="row">
                                <input  type="text" ref="screenName" name="screenName"
                                        onChange={this.handleScreenNameChange}
                                        placeholder="Screen Name"
                                        value={this.state.screenName}/>
                            </div>
                            <div className="row">
                                <input  type="text" ref="fullName" name="fullName"
                                        onChange={this.handleFullNameChange}
                                        placeholder="Full Name (Optional)"
                                        value={this.state.fullName}/>
                            </div>
                            <div className="row">
                                <input  type="text" ref="phone" name="phone"
                                        onChange={this.handlePhoneChange}
                                        placeholder="Phone (Optional)"
                                        value={this.state.phone}/>
                            </div>
                            <div className="row">
                                <label style={styles.toggleWrapper}>
                                    <Toggle checked={this.state.emailVisible}
                                            icons={false}
                                            onChange={() => this.setState({
                                                emailVisible: !this.state.emailVisible
                                            })}/>
                                    <div style={styles.toggleLabel}>
                                        {this.state.emailVisible ? 'My email address is visible to my neighbors' : 'My email address is hidden'}
                                    </div>
                                </label>
                            </div>

                            <br/>

                            <div className="row">
                                <label style={styles.toggleWrapper}>
                                    <Toggle checked={this.state.offerNotify}
                                            icons={false}
                                            onChange={() => this.setState({
                                                offerNotify: !this.state.offerNotify
                                            })}/>
                                    <div style={styles.toggleLabel}>
                                        {this.state.offerNotify ?   'Email notifications for each new offer - on' :
                                                                    'Email notifications for each new offer - off'}
                                    </div>
                                </label>
                            </div>

                            <div className="row">
                                <label style={styles.toggleWrapper}>
                                    <Toggle checked={this.state.offerNotifySMS}
                                            disabled={!this.state.phone.length > 0}
                                            icons={false}
                                            onChange={() => this.setState({
                                                offerNotifySMS: !this.state.offerNotifySMS
                                            })}/>
                                    {
                                        this.state.phone.length > 0 ?
                                            <div style={styles.toggleLabel}>
                                                {this.state.offerNotifySMS ?    'Text (SMS) notifications for each new offer - on' :
                                                    'Text (SMS) notifications for each new offer - off'}
                                            </div> :
                                            <div style={styles.toggleLabel}>
                                                To receive text messages, you must have a phone number
                                            </div>
                                    }

                                </label>
                            </div>

                            <br/>

                            <div className="row">
                                <label style={styles.toggleWrapper}>
                                    <Toggle checked={this.state.requestNotify}
                                            icons={false}
                                            onChange={() => this.setState({
                                                requestNotify: !this.state.requestNotify
                                            })}/>
                                    <div style={styles.toggleLabel}>
                                        {this.state.requestNotify ? 'Email notifications for each new request - on' :
                                                                    'Email notifications for each new request - off'}
                                    </div>
                                </label>
                            </div>

                            <div className="row">
                                <label style={styles.toggleWrapper}>
                                    <Toggle checked={this.state.requestNotifySMS}
                                            disabled={!this.state.phone.length > 0}
                                            icons={false}
                                            onChange={() => this.setState({
                                                requestNotifySMS: !this.state.requestNotifySMS
                                            })}/>
                                    {
                                        this.state.phone.length > 0 ?
                                            <div style={styles.toggleLabel}>
                                                {this.state.requestNotifySMS ?  'Text (SMS) notifications for each new request - on' :
                                                    'Text (SMS) notifications for each new request - off'}
                                            </div> :
                                            <div style={styles.toggleLabel}>
                                                To receive text messages, you must have a phone number
                                            </div>
                                    }

                                </label>
                            </div>

                            <div className="row upload-preview">
                                <ImageUpload avatarChange={this.handleAvatarChange}/>
                                <CurrentUser user={this.state}/>
                            </div>

                            <div style={{marginTop:'20px', textAlign:'center'}}>
                                <button className="button"
                                        type="submit"
                                        onClick={this.formSubmit}>
                                    Update Profile
                                </button>
                            </div>
                        </form>

                        <div className='button-cancel'
                             onClick={() => this.setState({modalOpen:false})}>
                            &#x2715;
                        </div>
                    </div>


                </Modal>

            </div>
        );
    }

}

// EditProfile.defaultProps = {};
// EditProfile.propTypes = {
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


// const mapToProps = (props) => {
//     Meteor.subscribe('currentProfile');
//     const myProfile = Profiles.find({userId:Meteor.userId()}).fetch();
//     return {
//         prof: myProfile[0],
//         user: Meteor.user()
//         // meteorCall: Meteor.call
//     }
// }

// export default createContainer( mapToProps, EditProfile );
export default EditProfile;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data