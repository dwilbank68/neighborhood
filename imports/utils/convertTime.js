import moment from 'moment';

export const convertTime = (ms) => {
    var momentTime = moment.utc(ms);
    return momentTime.local().format('MMMM Do YYYY, h:mma');
}