import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ScrollArea from 'react-scrollbar';

import ChatMessage from './ChatMessage.jsx';

class ChatList extends Component {

    componentDidMount() {
        import '../../utils/preventParentScroll.js';
    }


    constructor(props, context){
        super(props, context);
    //     this.state = {
            messages:[]
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    }
    
    
    // handleClick(e) {
    //    
    //    this.setState({
    //        
    //    })
    // }

    renderMessages(){
        if (this.props.messages) {
            return this.props.messages.map((msg, i) => {
                return (
                    <ChatMessage key={msg._id} msg={msg}/>
                )
            })
        } else {
            return <h3>loading...</h3>
        }

    }

    render() {
        return (
            <ScrollArea className="chat-list"
                       style={{height: '480px'}}>
                {this.renderMessages()}
            </ScrollArea>
        );
    }

}

// ChatList.defaultProps = {};
ChatList.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
    messages:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
};
//
// PropTypes -> array, bool, func, number, object, string, symbol

// ChatList.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default ChatList;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class ChatList extends Component {
    
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
    //         <div className="chat-list">
    //         </div>
    //     );
    // }
// }