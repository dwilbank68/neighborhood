import {Meteor} from 'meteor/meteor';

import { Email } from 'meteor/email';

Meteor.methods({
    'sendEmail'(emailRecipients, subject, postObj){
        console.log('------------------------------------------');
        console.log('emailRecipients ',emailRecipients, subject, postObj);
        console.log('------------------------------------------');
        // validateMessage(userId, updatesObj);
        if (!emailRecipients || !subject || !postObj) {
            throw new Meteor.Error('missing arguments for email');
        }
        if (emailRecipients.length === 0) {console.log('no email recipients');return;}
        if (Meteor.isServer) {
            let {body, email, address, needPicture=''} = postObj;
            body = body +'\n\n'+ '----- Contact Information -----' +'\n\n'+ address +'\n'+ email;
            if (needPicture.length > 0) {
                body = body +'\n\n----- Picture Attached -----\n\n'+ needPicture
            }
            console.log('------------------------------------------');
            console.log('emailRecipients once again',emailRecipients);
            console.log('------------------------------------------');
            Email.send({
                subject,
                text: body,
                from: 'noreply@traditions90250.com',
                bcc: emailRecipients
            });
        }

    }

})