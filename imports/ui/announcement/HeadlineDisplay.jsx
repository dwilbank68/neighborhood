import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
// import HeadlineDisplay from './HeadlineDisplay.jsx';
class HeadlineDisplay extends Component {

    componentDidUpdate(prevProps) {
        if (this.props === prevProps) return;
        if (!this.props.headlines) return;
        if (this.props.headlines.length > 0) {
            const headlinesCount = this.props.headlines.length;
            const cycleHeadlines = (length) => {
                let idx = 0;
                this.headlineInterval = setInterval(() => {

                    this.setState({fading: true});

                    this.headlineTimeout = setTimeout(() => {
                        this.setState({
                            headline:this.props.headlines[idx],
                            fading: false
                        })
                    }, 1000);

                    idx = (idx + 1) % length;

                }, 6000);
            }
            cycleHeadlines(headlinesCount);
        }
    }

    componentWillUnmount() {
        clearInterval(this.headlineInterval);
        clearTimeout(this.headlineTimeout);
    }


    constructor(props, context){
        super(props, context);
        this.state = {
            headline:''
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
        return (
            <Link to="/announcements" className='announcement-link'>
                <div className="headline-display">
                    <div className={`headline ${this.state.fading ? 'faded' : ''}`}>
                        {this.state.headline ? this.state.headline : new Date().toDateString()}
                    </div>
                </div>
            </Link>

        );
    }
}

// HeadlineDisplay.defaultProps = {};
// HeadlineDisplay.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// HeadlineDisplay.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default HeadlineDisplay;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class HeadlineDisplay extends Component {

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
