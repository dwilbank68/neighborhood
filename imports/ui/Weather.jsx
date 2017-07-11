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
            const temp = this.state.currently.temperature;
            const msg = this.state.daily.summary;
            const {temperatureMin, temperatureMax} = this.state.daily.data[0];
            return (
                <div className='weather' style={s.weather}>
                    <div style={{display: 'flex'}}>
                        <div className="currently">
                            <Skycons    color="white"
                                        icon={currentIcon}/>
                            <div className="nowTemp">
                                <div className="currentTemp">
                                    {Math.round(temp)}
                                </div>
                                <div className="minMaxTemp">
                                    {Math.round(temperatureMin)}/{Math.round(temperatureMax)}
                                </div>
                            </div>
                        </div>
                        <div className="forecast" style={{display:'flex'}}>
                            {this.renderForecast()}
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

    renderForecast(){
        const forecastArr = [];
        for(var i = 1; i < 4; i++){
            forecastArr.push({
                low: Math.round(this.state.daily.data[i].temperatureMin),
                high: Math.round(this.state.daily.data[i].temperatureMax),
                icon: this.state.daily.data[i].icon,
                summary: this.state.daily.data[i].summary
            });
        };

        return forecastArr.map((day, i) => {
            const icon = day.icon.toUpperCase().replace(/-/g,'_');
            return (
                <div key={i}>
                    <Skycons    color="white"
                                icon={icon}/>
                    <div className="weather-msg">
                        {day.low} / {day.high}
                    </div>
                </div>
            )
        })

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