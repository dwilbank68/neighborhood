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

Meteor.startup(() => {
    if (Meteor.settings.MAIL_URL) {
        process.env.MAIL_URL = Meteor.settings.MAIL_URL;
    }
});
