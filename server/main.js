import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {WebApp} from 'meteor/webapp';

import '../imports/api/announcements';
import '../imports/api/email';
import '../imports/api/messages';
import '../imports/api/needs';
import '../imports/api/offers';
import '../imports/api/phone_numbers';
import '../imports/api/services';
import '../imports/api/twilio';
import '../imports/api/users';
import '../imports/api/weather';
import '../imports/startup/simpl-schema-configuration.js';

Meteor.startup(() => {

    if (Meteor.settings.MAIL_URL) {
        process.env.MAIL_URL = Meteor.settings.MAIL_URL;
    }
    if (Meteor.settings.DARKSKY_KEY) {
        process.env.DARKSKY_KEY = Meteor.settings.DARKSKY_KEY;
    }
    if (Meteor.settings.TWILIO_NUMBER) {
        process.env.TWILIO_NUMBER = Meteor.settings.TWILIO_NUMBER;
    }
    if (Meteor.settings.TWILIO_ACCOUNT_SID) {
        process.env.TWILIO_ACCOUNT_SID = Meteor.settings.TWILIO_ACCOUNT_SID;
    }
    if (Meteor.settings.TWILIO_AUTH_TOKEN) {
        process.env.TWILIO_AUTH_TOKEN = Meteor.settings.TWILIO_AUTH_TOKEN;
    }

});
