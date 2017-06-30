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
    process.env.MAIL_URL='smtp://postmaster%40sandbox11a4d7fe027c458c8bf25c4a809a9a27.mailgun.org:0b23ce83e4dd741d0f141f4a214a56f0@smtp.mailgun.org:587';
});