import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import ReactSVG from 'react-svg';
import Snap from 'snapsvg';
// import {Map} from './Map.jsx';
export class Map extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            mapLoaded:false
        }
       this.updateMap = this.updateMap.bind(this)
    }

    componentDidMount() {
        this.updateMap();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        this.updateMap();
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     this.updateMap();
    // }


    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    render() {

        // var map = Snap('#map');
        // Snap.load("images/traditions90250.svg", function(data){
        //     if (map) {
        //         map.append(data);
        //         const a2047 = map.select('#a2047');
        //         a2047.attr({stroke:'yellow', strokeWidth:'6px'})
        //     }
        //
        // })

        return (
            <div className="map" id="map">
                {/*<ReactSVG   path="images/traditions90250.svg"*/}
                            {/*callback={svg => console.log(svg)}*/}
                            {/*className="map" />*/}
            </div>
        );
    }

    updateMap(){
        if (this.state.mapLoaded == false) {
            console.log('updateMap called from componentDidMount');
            // this runs upon ComponentDidMount
            let map = Snap('#map');
            Snap.load("images/traditions90250.svg", function(data){
                map.append(data);
                this.setState({mapLoaded:true});
                this.map = map;
            }.bind(this))
        } else {
            // this runs upon ComponentDidUpdate
            console.log('updateMap called from componentDidUpdate');
            if (!this.map) return;
            if (!this.props.allUsers) return;
            // const a2047 = this.map.select('#a2047');
            // a2047.attr({stroke:'yellow', strokeWidth:'6px'})
            this.props.allUsers.map((u) => {
                const signedUp = `a${parseInt(u.address)}`;
                const house = document.getElementById(signedUp);
                house.classList.add("signedUp");
                if (u.online == true) house.classList.add('online');
                if (u.online == false) house.classList.remove('online');
            })
        }
    }

}

// Map.defaultProps = {};
// Map.propTypes = {
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
    // Meteor.subscribe('bins');
    // const {binId} = props.params;
    return {
        // meteorCall: Meteor.call
    }
}

export default createContainer( mapToProps, Map );
// export default Map;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data