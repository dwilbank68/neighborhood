import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Modal from 'react-modal';

import { Editor } from 'react-draft-wysiwyg';
import {convertFromRaw, convertToRaw} from 'draft-js';

// import AnnouncementInput from './AnnouncementInput.jsx';
class AnnouncementInput extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            modalOpen:false,
        }
        // this.handleInputChange = this.handleInputChange.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.prepAnnouncement = this.prepAnnouncement.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }


    // handleInputChange(e) {
    //     this.setState({
    //         input: e.target.value
    //     })
    // }

    handleOpenModal(){
        const {
            screenName
        } = this.props.currentUser;
        this.setState({
            screenName,
            modalOpen: true
        });
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    }

    prepAnnouncement(e){
        e.preventDefault();
        if (this.state.editorState == null) {
            return;
        }
        const {screenName, userId} = this.props.currentUser;

        const annContent = this.state.editorState.getCurrentContent();
        let saveContent = convertToRaw(annContent);
        saveContent = JSON.stringify(saveContent);
        console.log('------------------------------------------');
        console.log('saveContent ', saveContent);
        console.log('------------------------------------------');

        const announcement = {
            saveContent,
            screenName,
            userId
        }
        this.props.handleAnnouncementSubmit(announcement);
        this.setState({modalOpen: false});
    }

    render() {

        const { editorState } = this.state;

        const modalStyle = {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            content: {
                bottom: '40px !important'
            }
        }

        const edStyle = {
            editorStyle: {
                backgroundColor: 'white',
                border: '1px solid gray',
                height: '300px'
            }
        }

        return (
            <div className="announcement-input">

                <div    className="announcement-new-button"
                        onClick={this.handleOpenModal}>
                    <p>Create An Announcement</p> <span>&#10010;</span>
                </div>

                <Modal  id="announcement-modal"
                        closeTimeoutMS={200}
                        contentLabel='Create An Announcement'
                        isOpen={this.state.modalOpen}
                        style={modalStyle}>

                    <p>Create An Announcement</p>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <Editor editorStyle={edStyle.editorStyle}
                            editorState={editorState}
                            onEditorStateChange={this.onEditorStateChange}/>

                    <button   className="announcement-input-button"
                              onClick={this.prepAnnouncement}>
                        Submit
                    </button>

                    <div className='button-cancel'
                         onClick={() => this.setState({
                             modalOpen:false,
                             categories: '',
                             input: ''
                         })}>
                        &#x2715;
                    </div>

                </Modal>

            </div>





        );
    }
}

// AnnouncementInput.defaultProps = {};
// AnnouncementInput.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// AnnouncementInput.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');


export default AnnouncementInput;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class AnnouncementInput extends Component {

// this.state = {
//     'whatever':{}
// }

// handleSubmit = (e) => {
//    ...
//    this.setState({
//        ...
//    })
// }

// render() {
//     return (
//         <div className="announcement-input">
//         </div>
//     );
// }
// }