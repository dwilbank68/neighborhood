import React, { Component } from 'react';
import PropTypes from 'prop-types';

import draftToHtml from 'draftjs-to-html';

// import AnnouncementDisplay from './AnnouncementDisplay.jsx';
class AnnouncementDisplay extends Component {

    componentDidUpdate(prevProps) {
        if (this.props === prevProps) return;
        if (this.props.announcements) {
            const annLength = this.props.announcements.length;
            const rotateAnnouncements = (length) => {
                let left = 0,
                middle = 1,
                right = 2;
                setInterval(() => {
                    this.setState({
                        leftTitle:this.props.announcements[left].title,
                        middleTitle:this.props.announcements[middle].title,
                        rightTitle:this.props.announcements[right].title
                    })
                    left   = (left + 1)   % length;
                    middle = (left + 1)   % length;
                    right  = (middle + 1) % length;
                }, 3000);
            }
            rotateAnnouncements(annLength);
        }
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            leftTitle:'',
            middleTitle:'',
            rightTitle:'',
        }
       // this.handleClick = this.handleClick.bind(this)
    }

    draft2html (saveContent) {
        return draftToHtml(saveContent);
    }
    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    renderAnnouncements() {
        if (this.props.announcements) {
            return this.props.announcements.map((ann) => {
                const html = draft2html(JSON.parse(ann.saveContent));
                return (
                    // <div    className="announcement"
                    //         key={ann._id}>
                    //     <h3>{ann.title}</h3>
                    //     <div dangerouslySetInnerHTML={{__html: html}}/>
                    // </div>
                    <div    className="announcement"
                            dangerouslySetInnerHTML={{__html: html}}
                            key={ann._id}/>

                )
            })
        }
    }

    render() {
        return (
            <div className="announcement-display">
                {this.props.announcements ? renderAnnouncements() : <span>...</span>}
            </div>
        );
    }
}

// AnnouncementDisplay.defaultProps = {};
// AnnouncementDisplay.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// AnnouncementDisplay.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default AnnouncementDisplay;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class AnnouncementDisplay extends Component {

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
    //         <div className="announcement-display">
    //         </div>
    //     );
    // }
// }
