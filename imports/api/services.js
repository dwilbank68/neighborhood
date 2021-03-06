import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Mongo} from 'meteor/mongo';
// import {data} from '../../addresses.js';

export const Services = new Mongo.Collection('services');

if (Meteor.isServer) {
    Meteor.publish('services', function () {
        return Services.find(
            {},
            { fields: {
                avatar: 1,
                body: 1,
                categories: 1,
                created: 1,
                email: 1,
                reputation: 1,
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
    'serviceCreate'(svc){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const {avatar, body, categories, email, screenName, userId} = svc;
        return Services.insert(
            {
                avatar,
                body,
                categories,
                created: new Date().getTime(),
                email,
                reputation: [],
                screenName,
                userId
            }
        )
    },
    'serviceDelete'(svcId){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return Services.remove({'_id':svcId})
    },
    'serviceVote'(svc){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (svc.hasOwnProperty(userId)) {
            throw new Meteor.Error('already gave a review');
        }
        const userId = this.userId;
        return Services.update(
            {'_id': svc._id},
            {
                $addToSet: {
                    'reputation': {
                        'author': userId
                    }
                }
            }
        )
        console.log('------------------------------------------');
        console.log('userId ', userId);
        console.log('svc ', svc);
        console.log('------------------------------------------');
        // return Services.remove({'_id':svcId})
    }
})