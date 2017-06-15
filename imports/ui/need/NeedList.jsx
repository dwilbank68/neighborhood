import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ScrollArea from 'react-scrollbar';

import NeedMessage from './NeedMessage.jsx';

class NeedList extends Component {

    constructor(props, context){
        super(props, context);
    //     this.state = {
            messages:[]
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    }

    deleteMsg(msgId){

        Meteor.call(
            'needDelete',
            msgId,
            (err, res) => {
                if (res) {
                    console.log('------------------------------------------');
                    console.log('res in deleteMsg',res);
                    console.log('------------------------------------------');
                } else {
                    console.log('err in deleteMsg', err);
                }
            }
        )
    }

    renderNeeds(){
        if (this.props.needs) {
            const needs = this.props.needs.filter((m) => {
                return (
                    m.body
                        .toLowerCase()
                        .search(this.props.filterText.toLowerCase()) !== -1
                    ||
                    m.screenName
                        .toLowerCase()
                        .search(this.props.filterText.toLowerCase()) !== -1
                )
            });
            return needs.map((msg) => {
                return (
                    <NeedMessage key={msg._id} msg={msg} deleteMsg={this.deleteMsg}/>
                )
            });
        } else {
            return <h3>loading...</h3>
        }

    }

    render() {
        return (
            <div>
                <ScrollArea className="generic-list"
                            stopScrollPropagation={true} >
                    {this.renderNeeds()}
                </ScrollArea>
            </div>


        );
    }

}

// ChatList.defaultProps = {};
NeedList.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
    needs:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
};
//
// PropTypes -> array, bool, func, number, object, string, symbol

// ChatList.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default NeedList;

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