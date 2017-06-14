import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollArea from 'react-scrollbar';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import ServiceInput from './ServiceInput.jsx';
import ServiceMessage from './ServiceMessage.jsx';

import {Services} from '../../api/services';


export class ServiceBox extends Component {

    constructor(props, context){
        super(props, context);
            this.state = {
                input:'',
                filterText: ''
            }
        this.handleChange = this.handleChange.bind(this);
        this.handleSvcSubmit = this.handleSvcSubmit.bind(this)
    }

    deleteSvc(svcId){

        Meteor.call(
            'serviceDelete',
            svcId,
            (err, res) => {
                if (res) {
                    console.log('------------------------------------------');
                    console.log('res in deleteSvc',res);
                    console.log('------------------------------------------');
                } else {
                    console.log('err in deleteSvc', err);
                }
            }
        )
    }

    handleChange(e) {
        this.setState({
            filterText: e.target.value
        })
    }

    handleSvcSubmit(svc) {
        Meteor.call(
            'serviceCreate',
            svc,
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

    renderServices(){
        if (this.props.services) {
            const svcs = this.props.services.filter((u) => {
                return (
                    u.categories
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                    ||
                    u.body
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                    ||
                    u.screenName
                        .toLowerCase()
                        .search(this.state.filterText.toLowerCase()) !== -1
                )
            });
            return svcs.map((svc) => {

                return (
                    <ServiceMessage key={svc._id}
                                    svc={svc}
                                    deleteSvc={this.deleteSvc}/>

                )

            })
        } else {
            return <div>loading...</div>
        }

    }

    render() {
        return (
            <div className="generic-box">
                <div className="generic-filter">
                    <input type="text"
                           onChange={this.handleChange}
                           placeholder="find by category or content"/>
                </div>

                <ScrollArea className="generic-list"
                            stopScrollPropagation={true}>
                    {this.renderServices()}
                </ScrollArea>

                <ServiceInput   handleSvcSubmit={this.handleSvcSubmit}
                                currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

// ServiceBox.defaultProps = {};
// ServiceBox.propTypes = {
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
    Meteor.subscribe('services');
    const services = Services.find({}).fetch();
    return {
        services
        // meteorCall: Meteor.call
    }
}

export default createContainer( mapToProps, ServiceBox );
// export default ServiceBox;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data