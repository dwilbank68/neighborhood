import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Mongo} from 'meteor/mongo';
// import {data} from '../../addresses.js';

export const PhoneNumbers = new Mongo.Collection('phone_numbers');

if (Meteor.isServer) {
    Meteor.publish('phone_numbers', function () {
        return PhoneNumbers.find(
            {},
            { fields: {
                name: 1,
                number: 1,
                userId: 1
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
    'phoneNumberCreate'(phoneNumber){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const {name, number, userId} = phoneNumber;
        return PhoneNumbers.insert(
            {
                name,
                number,
                userId
            }
        )
    },
    'phoneNumberDelete'(phoneNumberId){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return PhoneNumbers.remove({'_id':phoneNumberId})
    }
})