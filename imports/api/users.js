import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Accounts} from 'meteor/accounts-base';
import {Mongo} from 'meteor/mongo';

import {data} from '../../addresses.js';

// const Users = new Mongo.Collection('users');
//
// Meteor.publish('users', function(){
//     return Users.find({})
// })

export const validateNewUser = (user) => {
    const email = user.emails[0].address;
    const address = user.address;
    const screenname = user.screenname;
    const fullname = user.fullname;

    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        },
        address: {
            type: String, min: 4
        },
        screenname: {
            type: String, min: 2, max: 12
        },
        fullname: {
            type: String, max: 50, optional: true
        }
    }).validate({email, address, screenname, fullname});

    return true;
}

if (Meteor.isServer) {

    Accounts
        .onCreateUser((options, user) => {
            const {city, state, zipcode} = data;
            const {address, screenname, fullname} = options;
            user.address = address;
            user.city = city;
            user.state = state;
            user.zipcode = zipcode;
            user.fullname = fullname;
            user.screenname = screenname;
            return user;
        })

    Accounts.validateNewUser(validateNewUser);
}

Meteor.publish("allUsers", function () {
    return Meteor.users.find(
        {},
        { fields: {
            emails: 1,
            address: 1,
            fullname: 1,
            screenname: 1,
            'status.online': 1
        }}
    );
});

Meteor.publish("onlineUsers", function () {
    return Meteor.users.find(
        {"status.online":true},
        { fields: {
            emails: 1,
            address: 1,
            fullname: 1,
            screenname: 1
        }}
    );
});