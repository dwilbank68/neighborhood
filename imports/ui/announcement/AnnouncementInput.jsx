import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Modal from 'react-modal';

import { Editor } from 'react-draft-wysiwyg';
import {convertFromRaw, convertToRaw} from 'draft-js';

import draftToHtml from 'draftjs-to-html';

import htmlToText from 'html-to-text';

// import AnnouncementInput from './AnnouncementInput.jsx';
class AnnouncementInput extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            input: '',
            modalOpen:false,
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.prepAnnouncement = this.prepAnnouncement.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }

    handleInputChange(e) {
        this.setState({
            input: e.target.value
        })
    }

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
        if (this.state.input == '') {
            return;
        }
        const {screenName, id} = this.props.currentUser;
        const title = this.state.input;
        const annContent = this.state.editorState.getCurrentContent();
        const saveContent = convertToRaw(annContent);
        const saveContentString = JSON.stringify(saveContent);
        // const saveContent = JSON.parse(announcement.saveContent);
        const html = draftToHtml(saveContent);
        const plainText = htmlToText.fromString(html)


        const announcement = {
            plainText,
            saveContent: saveContentString,
            screenName,
            title,
            userId: id
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
                height: '312px', width: '450px',
                marginLeft: '156px',
                padding: '15px'
            }
        }

        return (
            <div className="generic-input">

                <div    className="announcement-new-button"
                        onClick={this.handleOpenModal}>
                    <p>Create An Announcement</p> <span>&#10010;</span>
                </div>

                <Modal  id="announcement-modal"
                        closeTimeoutMS={200}
                        contentLabel='Create An Announcement'
                        isOpen={this.state.modalOpen}
                        style={modalStyle}>

                    <h2 className="modal-title">Create An Announcement</h2>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <Editor editorStyle={edStyle.editorStyle}
                            editorState={editorState}
                            onEditorStateChange={this.onEditorStateChange}/>

                    <div className="title-button-wrapper">
                        <input      className="announcement-input-input"
                                    onChange={this.handleInputChange}
                                    placeholder="Title required"
                                    value={this.state.input}/>
                        <button   className="modal-submit-button"
                                  onClick={this.prepAnnouncement}>
                            Submit
                        </button>
                    </div>



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