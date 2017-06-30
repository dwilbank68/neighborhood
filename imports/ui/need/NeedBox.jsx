import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import NeedList from './NeedList.jsx';
import NeedInput from './NeedInput.jsx';

import {Needs} from '../../api/needs';

// import {NeedBox} from './NeedBox.jsx';
export class NeedBox extends Component {

    componentDidMount() {
        const requestRecipients = this.props.allUsers
            .filter(u => u.requestNotify === true)
            .map(u => u.email);
        this.setState({ requestRecipients });
    }


    constructor(props, context){
        super(props, context);
            this.state = {
                input:'',
                filterText: '',
                requestRecipients: []
            }
        this.handleChange = this.handleChange.bind(this)
        this.handleNeedSubmit = this.handleNeedSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            filterText: e.target.value
        })
    }

    handleNeedSubmit(need) {
        Meteor.call(
            'needCreate',
            need,
            this.state.requestRecipients,
            (err, res) => {
                if (res) {
                    console.log('------------------------------------------');
                    console.log('res ',res);
                    console.log('------------------------------------------');
                } else {
                    console.log('err', err);
                }
            }
        )
    }

    render() {
        return (
            <div className="generic-box">
                <div className="generic-filter">
                    <input type="text"
                           onChange={this.handleChange}
                           placeholder="find request by sender or by text"/>
                </div>
                <NeedList   filterText={this.state.filterText}
                            needs={this.props.needs}/>
                <NeedInput  handleNeedSubmit={this.handleNeedSubmit}
                            currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

// NeedBox.defaultProps = {};
// NeedBox.propTypes = {
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
    Meteor.subscribe('needs');
    // const {binId} = props.params;
    return {
        needs: Needs.find({}, {sort:{created:-1}})
                    .fetch(),
    }
}

export default createContainer( mapToProps, NeedBox );
// export default NeedBox;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data