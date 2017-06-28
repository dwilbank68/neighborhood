import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import PropTypes from 'prop-types';
import ScrollArea from 'react-scrollbar';

import AllUsersItem from './AllUsersItem';

class AllUsersBox extends Component {

    componentDidMount() {
        this.setState({
            emails: this.props.allUsers.map(u => u.email).join(', ')
        })
    }


    constructor(props, context){
        super(props, context);
        this.state = {
            copied: false,
            emails:''
        }
       // this.handleClick = this.handleClick.bind(this)
    }


    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    render() {

        const styles = {
            copied: {
                color: 'white',
                fontFamily: "Lato",
                fontWeight: '700',
                marginBottom: '30px',
                marginTop: '10px',
                textAlign: 'center'
            },
            copy: {
                color: 'white',
                cursor: 'pointer',
                fontFamily: "Lato",
                fontWeight: '400',
                marginBottom: '30px',
                marginTop: '10px',
                textAlign: 'center'
            }
        }

        return (

                <div className="generic-box">
                    <CopyToClipboard    text={this.state.emails}
                                        onCopy={() => this.setState({copied: true})}>
                        { this.state.copied ?
                            <div style={styles.copied}>Copied.</div> :
                            <div style={styles.copy}>
                                Copy all emails to clipboard
                            </div> }

                    </CopyToClipboard>

                    <ScrollArea className='phone-info-list'
                                stopScrollPropagation={true}>
                        {this.props.allUsers.map((user, i) => {
                            return (
                                <AllUsersItem key={user.id} user={user}/>
                            )
                        })}
                    </ScrollArea>

                </div>
        );
    }
}

// AllUsersBox.defaultProps = {};
// AllUsersBox.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// AllUsersBox.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default AllUsersBox;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class AllUsersBox extends Component {

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
    //         <div className="all-emails-box">
    //         </div>
    //     );
    // }
// }