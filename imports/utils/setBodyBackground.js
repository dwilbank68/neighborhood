import _ from 'lodash';

export default () => {
    const hour = new Date().getHours();
    const body = document.querySelector('body');
    if (_.includes([1,2,3,4], hour))    body.className = 'night-city';
    if (_.includes([5,6], hour))        body.className = 'sunrise';
    if (_.includes([7], hour))          body.className = 'sunrise2';
    if (_.includes([8,9], hour))        body.className = 'day';
    if (_.includes([10,11,12], hour))   body.className = 'midday';
    if (_.includes([13,14], hour))      body.className = 'sky-gradient-11';
    if (_.includes([15], hour))         body.className = 'day';
    if (_.includes([16], hour))         body.className = 'day2';
    if (_.includes([17,18,19], hour))   body.className = 'dusk';
    if (_.includes([20,21], hour))      body.className = 'sky-gradient-20';
    if (_.includes([22,23,0], hour))    body.className = 'night';
}
