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
                avatar: 1,
                screenName: 1, fullName: 1,
                phone: 1
            }}
        );
    })
}

export const createProfile = (userId, options) => {

    const {city, state, zipcode} = data;
    const {address, screenName, fullName} = options;
    const avatar = '';
    const phone = '';
    new SimpleSchema({
        userId: {type: String},
        address: {
            type: String, min: 4
        },
        avatar: {type: String},
        screenName: {
            type: String, min: 2, max: 12
        },
        fullName: {
            type: String, max: 50, optional: true
        },
        phone: {type: String, optional: true}
    }).validate({address, screenName, fullName, userId, avatar, phone});

    Profiles.insert({
        userId,
        screenName, fullName,
        address, city, state, zipcode,
        avatar,
        phone
    })
}