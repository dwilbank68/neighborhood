import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Mongo} from 'meteor/mongo';
// import {data} from '../../addresses.js';

export const Messages = new Mongo.Collection('messages');
//
if (Meteor.isServer) {
    Meteor.publish('messages', function () {
        return Messages.find(
            {},
            { fields: {
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
    'messageCreate'(msg){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const {avatar, body, email, screenName, userId} = msg;
        return Messages.insert(
            {
                avatar,
                body,
                created: new Date().getTime(),
                email,
                screenName,
                userId
            }
        )
    },
    'messageDelete'(msgId){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return Messages.remove({'_id':msgId})
    }
})