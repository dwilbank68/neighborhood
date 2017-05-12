import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Input, TextArea, GenericInput} from 'react-text-input';
// import ChatInput from './ChatInput.jsx';
class ChatInput extends Component {

    constructor(props, context){
        super(props, context);
            this.state = {
                input:''
            }
       this.handleInputChange = this.handleInputChange.bind(this)
    }


    handleInputChange(e) {
        this.setState({
            input: e.target.value
        })
    }

    render() {
        return (
            <div    className="chat-input" >
                <TextArea   fitLineLength={true}
                            ref="chatInput"
                            onChange={this.handleInputChange}
                            value={this.state.input}/>
            </div>
        );
    }
}

// ChatInput.defaultProps = {};
// ChatInput.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// ChatInput.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');


export default ChatInput;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class ChatInput extends Component {

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