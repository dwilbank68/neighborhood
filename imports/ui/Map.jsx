import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import ReactSVG from 'react-svg';
import Snap from 'snapsvg';
// import {Map} from './Map.jsx';
export class Map extends Component {

    clearMarkers() {
        var myNode = document.getElementById("map");
        // remove everything except the svg map itself
        while (myNode.children.length > 1) {
            myNode.removeChild(myNode.lastChild);
        }
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            mapLoaded:false
        }
       this.updateMapUsers = this.updateMapUsers.bind(this)
       this.updateMapNeeds = this.updateMapNeeds.bind(this)
       this.updateMapOffers = this.updateMapOffers.bind(this)
    }

    componentDidMount() {
        window.addEventListener(
            "resize",
            _.debounce(
                this.updateMapMarkers.bind(this),
                500
            )
        );
        this.updateMapUsers();
        this.clearMarkers();
        this.updateMapNeeds();
        this.updateMapOffers();
    }

    componentDidUpdate() {
        this.updateMapUsers();
        this.clearMarkers();
        this.updateMapNeeds();
        this.updateMapOffers();
    }

    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    render() {
        return (
            <div className="map" id="map">
            </div>
        );
    }

    updateMapMarkers(){
        this.clearMarkers();
        this.updateMapNeeds();
        this.updateMapOffers();
    }

    updateMapNeeds(){
        if (!this.props.needs) return;
        if (this.props.needs.length == 0) return;
        const mapDiv = document.getElementById('map');

        this.props.needs.map((n) => {
            const locObj = this.getMarkerLocationAndSize(n);

            const need = document.createElement('div');
            if (n.body.search('urgent') >=0 || n.body.search('emergency') >= 0) {
                need.classList.add('need-urgent');
            } else {
                need.classList.add('need');
            }
            need.style.height = locObj.size + 'px';
            need.style.width =  locObj.size + 'px';
            need.style.left =   locObj.left + 'px';
            need.style.top =    locObj.top + 'px';
            need.addEventListener(
                "mouseover",
                () => {console.log(n.body);}
            );
            const p = document.createElement('p');
            p.classList.add('marker-text');
            p.innerText = n.body;
            need.appendChild(p);
            mapDiv.appendChild(need);
        })
    }

    updateMapOffers(){
        console.log('------------------------------------------');
        console.log('updateMapOffers ');
        console.log('------------------------------------------');
        if (!this.props.offers) return;
        if (this.props.offers.length == 0) return;
        const mapDiv = document.getElementById('map');

        this.props.offers.map((o) => {
            const locObj = this.getMarkerLocationAndSize(o);

            const offer = document.createElement('div');
            if (o.body.search(' free ') >=0) {
                offer.classList.add('offer-free');
            } else {
                offer.classList.add('offer');
            }
            offer.style.height = locObj.size + 'px';
            offer.style.width =  locObj.size + 'px';
            offer.style.left =   locObj.left - (locObj.size * 1.3) + 'px';
            offer.style.top =    locObj.top + 'px';
            offer.addEventListener(
                "mouseover",
                () => {console.log(o.body);}
            );
            const p = document.createElement('p');
            p.classList.add('marker-text');
            p.innerText = o.body;
            offer.appendChild(p);
            mapDiv.appendChild(offer);
        })
    }

    getMarkerLocationAndSize(item){
        const mapRect = document
            .getElementById('Neighborhood_Map_Outlines')
            .getBoundingClientRect();
        const number = document.getElementById(`n${parseInt(item.address)}`);
        const numberRect = number.getBoundingClientRect();
        let left =  numberRect.left                 // left edge of address box
                    + (numberRect.width / 2)        // center of address box
                    - numberRect.height / 2         // move left half the diameter of the marker
                    - mapRect.left;                 // adjust for space around the map div
        let top =   numberRect.top
                    - (numberRect.height * 1.5)     // point right above address box
                    - mapRect.top;                  // adjust for space above the map div
        let size = (numberRect.height * .7);        // marker will be slightly smaller than address box
        return {top, left, size};
    }

    updateMapUsers(){
        if (this.state.mapLoaded == false) {
            // this block runs upon ComponentDidMount
            let map = Snap('#map');
            Snap.load("images/traditions90250.svg", function(data){
                map.append(data);
                this.setState({mapLoaded:true});
                this.map = map;
            }.bind(this))
        } else {
            // this block runs upon ComponentDidUpdate
            if (!this.map) return;
            if (!this.props.allUsers) return;
            this.props.allUsers.map((u) => {
                const signedUp = `a${parseInt(u.address)}`;
                // the svg ids are like "a2047" because ids can't begin with a number
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