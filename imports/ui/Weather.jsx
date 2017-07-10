import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Skycons from 'react-skycons';

const s = {
    weather: {
        border: '1px solid green',
        height: '70px',
        marginLeft: '15px'
    }
}

class Weather extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {}
    }
    componentDidMount() {
        Meteor.call(
            'getWeather',
            (err,res) => {
                if (res) {
                    this.setState({currently: res.currently});
                    this.setState({daily: res.daily});
                    console.log('res ',res);
                } else { console.log('err ',err); }
            }
        )

    }

    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    render() {
        if (this.state.currently && this.state.daily) {
            const currentIcon = this.state.currently.icon.toUpperCase().replace(/-/g,'_');
            const msg = this.state.daily.summary;
            return (
                <div className='weather' style={s.weather}>
                    <div>
                        <div className="currently">
                            <Skycons    color="white"
                                        icon={currentIcon}/>
                        </div>
                        <div className="forecast">

                        </div>
                    </div>
                    <div className="weather-msg">
                        {msg}
                    </div>
                </div>
            );
        } else {
            return <span>Loading...</span>
        }

    }
}

// Weather.defaultProps = {};
// Weather.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// Weather.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default Weather;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class Weather extends Component {

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
    //         <div className="weather">
    //         </div>
    //     );
    // }
// }