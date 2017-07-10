import {Meteor} from 'meteor/meteor';
import axios from 'axios';
// const DARKSKY_URL = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/33.917021,-118.3175701?exclude=minutely,hourly,alerts,flags`;
const DARKSKY_URL = `https://api.darksky.net/forecast/cb467dec5d29bcff081f1ceab2fbabbb/33.917021,-118.3175701?exclude=minutely,hourly,alerts,flags`;

Meteor.methods({
    'getWeather'(){
        return axios
            .get(DARKSKY_URL)
            .then(
                function(res){
                    console.log('res.data ',res.data);
                    return res.data;
                },
                function(err){ console.log('err ',err); return err; }
            )

    }

})