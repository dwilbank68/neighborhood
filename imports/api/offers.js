import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Mongo} from 'meteor/mongo';
// import {data} from '../../addresses.js';

export const Offers = new Mongo.Collection('offers');
//
if (Meteor.isServer) {
    Meteor.publish('offers', function () {
        return Offers.find(
            {},
            { fields: {
                address: 1,
                avatar: 1,
                body: 1,
                created: 1,
                email: 1,
                screenName: 1,
                userId: 1,
                userName: 1
            }}
        );
    })



}
//
// export const validateProfile = (userId, profileObj) => {
//     const {address, avatar, emailVisible, fullName, screenName, phone} = profileObj;
//     new SimpleSchema({
//         userId: {type: String},
//         address: {
//             type: String, min: 4
//         },
//         avatar: {type: String},
//         emailVisible: {type: Boolean},
//         screenName: {
//             type: String, min: 2, max: 12
//         },
//         fullName: {
//             type: String, max: 30, optional: true
//         },
//         phone: {type: String, optional: true}
//     })
//         .validate({address, avatar, emailVisible, fullName, screenName, userId, phone});
//     return true;
// }

Meteor.methods({
    'offerCreate'(msg){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const {address, avatar, body, email, screenName, userId} = msg;
        return Offers.insert(
            {
                address,
                avatar,
                body,
                created: new Date().getTime(),
                email,
                screenName,
                userId
            }
        )
    },
    'offerDelete'(msgId){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return Offers.remove({'_id':msgId})
    }
})