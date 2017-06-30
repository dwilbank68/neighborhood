import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Mongo} from 'meteor/mongo';
// import {data} from '../../addresses.js';

import { Email } from 'meteor/email';
// var Mailgun = require('mailgun').Mailgun;
// var mg = new Mailgun('5d68bdd723f4f3ce0b1e46cb28d6797f');

export const Needs = new Mongo.Collection('needs');
//
if (Meteor.isServer) {
    Meteor.publish('needs', function () {
        return Needs.find(
            {},
            {
                fields: {
                    address: 1,
                    avatar: 1,
                    body: 1,
                    created: 1,
                    email: 1,
                    needPicture: 1,
                    screenName: 1,
                    urgent: 1,
                    userId: 1,
                    userName: 1
                }
            }
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
    'needCreate'(msg, recipients){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const {address, avatar, body, email, needPicture, screenName, urgent, userId} = msg;
        // if (Meteor.isServer) {
        //     Email.send({
        //         subject: 'test for 2 emails',
        //         text: body,
        //         from: 'dwilbank@hotmail.com',
        //         to: recipients
        //     });
        // }

        // mg.sendText('traditions90250@noreply.com', 'dwilbank@gmail.com', 'new request', body, (err) => {
        //     console.log('------------------------------------------');
        //     console.log('err ',err);
        //     console.log('------------------------------------------');
        // })

        return Needs.insert(
            {
                address,
                avatar,
                body,
                created: new Date().getTime(),
                email,
                needPicture,
                screenName,
                urgent,
                userId
            }
        )
    },
    'needDelete'(msgId){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return Needs.remove({'_id': msgId})
    }
})