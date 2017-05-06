import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

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
            // avatar: this.props.profile.avatar ? this.props.profile.avatar : 'http://www.avatarsdb.com/avatars/cat_comp.gif',
            modalOpen:false
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.upload = this.upload.bind(this)
    }

    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    formSubmit(){
        // Ofcourse you'll have other fields...
        let avatarUrl = this.state.avatar;
        Meteor.users.update( { _id: Meteor.userId() }, {
            $set: {profile: avatarUrl}
        });
    }

    render() {

        const modalStyle = {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        }

        return (
            <div className="edit-profile">

                <button className="button"
                        onClick={() => this.setState({modalOpen:true})}>
                    Update My Info
                </button>

                <Modal  closeTimeoutMS={200}
                        isOpen={this.state.modalOpen}
                        contentLabel="Update Your User Info"
                        style={modalStyle}>

                    <p>Update Your User Info</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="row well">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">File input</label>
                                    <input type="file" id="input"
                                           onChange={this.upload} />
                                    <p className="help-block">Image max restriction: 2MB, 500x500. Cropped: 200x200</p>
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

                    <button onClick={() => this.setState({modalOpen:false, url:''})}>
                        cancel
                    </button>

                </Modal>

            </div>
        );
    }

    upload(){
        var userId = Meteor.user()._id;
        var metaContext = {avatarId: userId};
        var uploader = new Slingshot.Upload("UsersAvatar", metaContext);
        uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) { // you can use refs if you like
            if (error) {
                // Log service detailed response
                console.error('Error uploading', uploader.xhr.response);
                alert(error); // you may want to fancy this up when you're ready instead of a popup.
            }
            else {
                // we use $set because the user can change their avatar so it overwrites the url :)
                Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": downloadUrl}});
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
    // Meteor.subscribe('bins');
    // const {binId} = props.params;
    return {
        myProfile: Profiles.find({id:Meteor.userId()}).fetch(),
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