import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Mongo} from 'meteor/mongo';
// import {data} from '../../addresses.js';

export const Announcements = new Mongo.Collection('announcements');

if (Meteor.isServer) {
    Meteor.publish('announcements', function () {
        return Announcements.find(
            {},
            { fields: {
                active: 1,
                created: 1,
                saveContent: 1,
                screenName: 1,
                userId: 1,
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
    'announcementCreate'(announcement){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const { saveContent, screenName, userId } = announcement;
        console.log('------------------------------------------');
        console.log('screenName ',screenName);
        console.log('screenName ',screenName);
        console.log('------------------------------------------');
        return Announcements.insert(
            {
                active: true,
                created: new Date().getTime(),
                saveContent,
                screenName, userId
            }
        )
    },
    'announcementDelete'(announcementId){
        // validateMessage(userId, updatesObj);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return Announcements.remove({'_id':announcementId})
    }
})