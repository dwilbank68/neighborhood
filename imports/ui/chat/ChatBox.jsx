import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import ChatList from './ChatList.jsx';
import ChatInput from './ChatInput.jsx';

import {Messages} from '../../api/messages';

// import {ChatBox} from './ChatBox.jsx';
export class ChatBox extends Component {

    constructor(props, context){
        super(props, context);
            this.state = {
                input:''
            }
        this.handleInputSubmit = this.handleInputSubmit.bind(this)
    }



    handleInputSubmit(e) {
        this.setState({

        })
    }

    render() {
        return (
            <div className="chat-box">
                ChatBox
                <ChatList   messages={this.props.messages}/>
                <ChatInput/>
            </div>
        );
    }
}

// ChatBox.defaultProps = {};
// ChatBox.propTypes = {
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
    Meteor.subscribe('messages');
    // const {binId} = props.params;
    return {
        messages: Messages.find({}).fetch(),
        // meteorCall: Meteor.call
    }
}

// export default createContainer( mapToProps, ChatBox );
export default ChatBox;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data