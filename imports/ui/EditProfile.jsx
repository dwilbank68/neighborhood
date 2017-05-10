import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Toggle from 'react-toggle'

import {Profiles} from '../api/profiles';
import ImageUpload from './ImageUpload';

// import EditProfile from './EditProfile.jsx';
// import {EditProfile} from './EditProfile.jsx';
export class EditProfile extends Component {

    componentWillMount() {

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

    handleAvatarChange(avatarUrl){
        console.log('------------------------------------------');
        console.log('avatarUrl in handleAvatarChange',avatarUrl);
        console.log('------------------------------------------');
        this.setState({
            avatar:avatarUrl
        })
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

                        <ImageUpload avatarChange={this.handleAvatarChange}/>

                        <button className="btn btn-lg btn-primary btn-block"
                                type="submit"
                                onClick={this.formSubmit}>
                            Update Profile
                        </button>

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