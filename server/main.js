import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {WebApp} from 'meteor/webapp';

import '../imports/api/announcements';
import '../imports/api/messages';
import '../imports/api/needs';
import '../imports/api/offers';
import '../imports/api/phone_numbers';
import '../imports/api/services';
import '../imports/api/users';
import '../imports/startup/simpl-schema-configuration.js';

// if (Meteor.isServer) {
//     const prodSID = 'ACd7c0591256b00094cf9f60c41b7a5d51';
//     const prodAuthToken = 'edc5cd8e9f6164cf6dbd0fa0735a1014';
//     const testSID = 'ACa1da63f662b79171336460c38769aea3';
//     const testAuthToken = 'ba59c37a8e182c3ff4c796aae2448a2a';
// // const client = new twilio(testSID, testAuthToken)
//     export const twilioClient = new Twilio({
//         from: '555-1212',
//         sid: testSID,
//         token: testAuthToken
//     });
//
// }

Meteor.startup(() => {
    process.env.MAIL_URL='smtp://postmaster%40sandbox11a4d7fe027c458c8bf25c4a809a9a27.mailgun.org:0b23ce83e4dd741d0f141f4a214a56f0@smtp.mailgun.org:587';
});