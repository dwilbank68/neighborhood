import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Toggle from 'react-toggle'
import ImageUpload from '../ImageUpload';

const styles = {
    buttonWrapper: {
        display:'flex',
        justifyContent:'center'
    },
    textArea: {
        fontWeight: '400',
        height: '200px',
        width: '456px',
        padding: '5px'
    },
    toggleWrapper: {
        display: 'flex',
        marginTop: '5px'
    },
    urgentText: {
        fontFamily: 'Lato, sans-serif',
        fontWeight: '400',
        marginLeft: '14px',
        marginTop: '4px'
    }
}
// import NeedInput from './NeedInput.jsx';
class NeedInput extends Component {

    constructor(props, context){
        super(props, context);
            this.state = {
                input:'',
                modalOpen:false,
                needPicture: '',
                urgent: false
            }
        this.handleNeedPicChange = this.handleNeedPicChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.prepNeed = this.prepNeed.bind(this)
    }

    handleNeedPicChange(needPicUrl){
        // could also use public_id argument
        // if using cloudinary's react sdk
        this.setState({
            needPicture: needPicUrl,
        })
    }

    handleInputChange(e) {
        this.setState({
            input: e.target.value
        })
    }

    handleOpenModal(){
        this.setState({
            modalOpen: true
        });
    }

    prepNeed(e){
        e.preventDefault();
        if (this.state.input == '') {
            return;
        }
        const {address, avatar, email, screenName } = this.props.currentUser;
        const {needPicture, urgent} = this.state;
        const need = {
            address, avatar,
            body: this.state.input,
            email, needPicture, screenName,
            urgent,
            userId: Meteor.userId()
        }
        this.props.handleNeedSubmit(need);
        this.setState({
            input:'',
            modalOpen: false
        });
    }

    render() {

        const modalStyle = {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            content: {
                bottom: '40px !important'
            }
        }

        return (
            <form   className="generic-input" >
                <div    className="need-new-button"
                        onClick={this.handleOpenModal}>
                    <p>Post A Request</p> <span>&#10010;</span>
                </div>

                <Modal  closeTimeoutMS={200}
                        isOpen={this.state.modalOpen}
                        contentLabel="Post Your Request"
                        style={modalStyle}>
                    <div className="modal-content-wrapper">
                        <h2 className="modal-title">Post Your Request</h2>

                        {this.state.error ? <p>{this.state.error}</p> : undefined}

                        <form onSubmit={this.onSubmit}>

                            <div className="row">
                                <div>
                                    <textarea   onChange={this.handleInputChange}
                                                style={styles.textArea}
                                                value={this.state.input} />
                                </div>
                            </div>

                            <div className="row">
                                <label style={styles.toggleWrapper}>
                                    <Toggle checked={this.state.urgent}
                                            icons={false}
                                            onChange={() => this.setState({urgent: !this.state.urgent})}/>
                                    <div style={styles.urgentText}>
                                        {this.state.urgent ? 'Request is urgent' : 'Request is not urgent'}
                                    </div>
                                </label>
                            </div>

                            <div className="row upload-preview">
                                <ImageUpload avatarChange={this.handleNeedPicChange}/>
                                <img src={this.state.needPicture}/>
                            </div>

                            <div style={styles.buttonWrapper}>
                                <button className="button"
                                        onClick={this.prepNeed}>
                                    Submit Request
                                </button>
                            </div>


                        </form>

                        <div className='button-cancel'
                             onClick={() => this.setState({modalOpen:false})}>
                            &#x2715;
                        </div>
                    </div>


                </Modal>

            </form>
        );
    }
}

// NeedInput.defaultProps = {};
// NeedInput.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// NeedInput.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');


export default NeedInput;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class NeedInput extends Component {

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
    //         <div className="chat-input">
    //         </div>
    //     );
    // }
// }