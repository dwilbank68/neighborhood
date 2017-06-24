import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Mongo} from 'meteor/mongo';
import {data} from '../../addresses.js';

export const Profiles = new Mongo.Collection('profiles');

if (Meteor.isServer) {
    Meteor.publish('profiles', function () {
        return Profiles.find(
            {},
            { fields: {
                userId: 1,
                address: 1, city: 1, state: 1, zipcode: 1,
                admin: 1,
                avatar: 1,
                screenName: 1, fullName: 1,
                phone: 1,
                emailVisible: 1
            }}
        );
    })
    Meteor.publish('currentProfile', function() {
        return Profiles.find(
            {userId: this.userId},
            { fields: {
                userId: 1,
                address: 1, city: 1, state: 1, zipcode: 1,
                avatar: 1,
                admin: 1,
                screenName: 1, fullName: 1,
                phone: 1,
                emailVisible: 1
            }}
        )
    })
}

export const validateProfile = (userId, profileObj) => {
    const {address, avatar, emailVisible, fullName, screenName, phone} = profileObj;
    new SimpleSchema({
        userId: {type: String},
        address: {
            type: String, min: 4
        },
        admin: {type: Boolean, optional:true},
        avatar: {type: String},
        emailVisible: {type: Boolean},
        screenName: {
            type: String, min: 2, max: 12
        },
        fullName: {
            type: String, max: 30, optional: true
        },
        phone: {type: String, optional: true}
    })
    .validate({address, admin, avatar, emailVisible, fullName, screenName, userId, phone});
    return true;
}

export const createProfile = (userId, options) => {

    const {city, state, zipcode} = data;
    const {address, screenName, fullName} = options;
    options.avatar = '';
    options.emailVisible = false;
    options.phone = '';

    validateProfile(userId, options);

    Profiles.insert({
        userId,
        screenName, fullName,
        address, city, state, zipcode,
        avatar: options.avatar,
        phone: options.phone,
        emailVisible: options.emailVisible
    })
}

Meteor.methods({
    'profileUpdate': function(userId, updatesObj){
        validateProfile(userId, updatesObj);

        return Profiles.update(
            {userId},
            {$set:{...updatesObj}}
        )
    }
})