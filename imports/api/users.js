import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Accounts} from 'meteor/accounts-base';
import {Mongo} from 'meteor/mongo';

import {createProfile} from './profiles';

export const validateNewUser = (user) => {
    const email = user.emails[0].address;
    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validate({email});
    return true;
}

if (Meteor.isServer) {
    Accounts
        .onCreateUser((options, user) => {
            // when user created, create a matching profile
            // with all the other data from the form (which is in options)
            createProfile(user._id, options);
            return user;
        })
    Accounts.validateNewUser(validateNewUser);
}

Meteor.publish("allUsers", function () {
    return Meteor.users.find(
        {},
        { fields: {
            emails: 1,
            _id: 1,
            'status.idle': 1,
            'status.online': 1
        }}
    );
});

// Meteor.publish("onlineUsers", function () {
//     return Meteor.users.find(
//         {"status.online":true},
//         { fields: {
//             emails: 1
//         }}
//     );
// });