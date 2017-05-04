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

    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        },
        address: {
            type: String, min: 4
        }
    }).validate({email, address});

    return true;
}

if (Meteor.isServer) {

    Accounts
        .onCreateUser((options, user) => {
            const {city, state, zipcode} = data;
            user.address = options.address;
            user.city = city;
            user.state = state;
            user.zipcode = zipcode;
            return user;
        })

    Accounts.validateNewUser(validateNewUser);
}
