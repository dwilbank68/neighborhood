import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Toggle from 'react-toggle'

import {Profiles} from '../api/profiles';

// import EditProfile from './EditProfile.jsx';
// import {EditProfile} from './EditProfile.jsx';
export class EditProfile extends Component {

    componentWillMount() {
        Slingshot.fileRestrictions("avatar", {
            allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
            maxSize: 2 * 500 * 500
        });
    }


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
        this.upload =                   this.upload.bind(this)
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
                address:        this.state.address,
                avatar:         this.state.avatar,
                fullName:       this.state.fullName,
                phone:          this.state.phone,
                screenName:     this.state.screenName,
                emailVisible:   this.state.emailVisible
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

    handleFullNameChange(e){
        const fullName = e.target.value;
        this.setState({fullName});
    }

    handleOpenModal(){
        const {address, fullName, screenName, avatar, phone, emailVisible} = this.props.prof;
        this.setState({address, fullName, screenName, avatar, phone, emailVisible});
        this.setState({modalOpen:true});
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

        const modalStyle = {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        // const {fullName, screenName, avatar, phone} = this.props.prof;

        return (
            <div className="edit-profile">

                <button className="button"
                        onClick={this.handleOpenModal}>
                    Update My Info
                </button>

                <Modal  closeTimeoutMS={200}
                        isOpen={this.state.modalOpen}
                        contentLabel="Update Your User Info"
                        style={modalStyle}>

                    <p>Update Your User Info</p>

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
                        {/*<Switch onClick={() => this.setState({emailVisible: !this.state.emailVisible})}>*/}
                            {/*{this.state.emailVisible ? 'Show My Email' : 'Hide My Email'}*/}
                        {/*</Switch>*/}
                        <label>
                            <Toggle checked={this.state.emailVisible}
                                    icons={false}
                                    onChange={() => this.setState({emailVisible: !this.state.emailVisible})}/>
                            <span>{this.state.emailVisible ? 'Email is visible' : 'Email is hidden'}</span>
                        </label>
                        <div className="row well">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">File input</label>
                                    <input type="file" id="input"
                                           onChange={this.upload} />
                                    <p className="help-block">
                                        Image max restriction: 2MB, 500x500. Cropped: 200x200
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 utar-r">
                                <img src={this.state.avatar}
                                     height="200"
                                     width="200" alt="..."
                                     className="img-rounded" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-lg btn-primary btn-block"
                                        type="submit"
                                        onClick={this.formSubmit}>
                                    Update Profile
                                </button>
                            </div>
                        </div>
                        {/*<input  type="text"*/}
                                {/*onChange={this.onChange}*/}
                                {/*placeholder="URL"*/}
                                {/*value={this.state.url}/>*/}
                        {/*<button>Add Link</button>*/}
                    </form>

                    <button onClick={() => this.setState({modalOpen:false})}>
                        cancel
                    </button>

                </Modal>

            </div>
        );
    }

    upload(){
        var userId = Meteor.userId();
        var metaContext = {avatarId: userId};
        var uploader = new Slingshot.Upload("UsersAvatar", metaContext);
        uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
            if (error) {
                // Log service detailed response
                console.error('Error uploading', uploader.xhr.response);
                alert(error); // you may want to fancy this up when you're ready instead of a popup.
            }
            else {
                alert(downloadUrl);
                this.setState({avatar: downloadUrl});
                // we use $set because the user can change their avatar so it overwrites the url :)
                // Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": downloadUrl}});
            }
            // you will need this in the event the user hit the update button because it will remove the avatar url
            this.setState({avatar: downloadUrl});
        }.bind(this));
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


const mapToProps = (props) => {
    Meteor.subscribe('currentProfile');
    const myProfile = Profiles.find({userId:Meteor.userId()}).fetch();
    return {
        prof: myProfile[0]
        // meteorCall: Meteor.call
    }
}

export default createContainer( mapToProps, EditProfile );
// export default EditProfile;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data