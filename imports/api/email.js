import {Meteor} from 'meteor/meteor';

import { Email } from 'meteor/email';

Meteor.methods({
    'sendEmail'(emailRecipients, subject, needObj){
        console.log('------------------------------------------');
        console.log('emailRecipients ',emailRecipients, subject, needObj);
        console.log('------------------------------------------');
        // validateMessage(userId, updatesObj);
        if (!emailRecipients || !subject || !needObj) {
            throw new Meteor.Error('missing arguments for email');
        }
        if (Meteor.isServer) {
            let {body, email, address, needPicture} = needObj;
            body = body +'\n\n'+ '----- Contact Information -----' +'\n\n'+ address +'\n'+ email;
            if (needPicture.length > 0) {
                body = body +'\n\n----- Picture Attached -----\n\n'+ needPicture
            }
            Email.send({
                subject,
                text: body,
                from: 'noreply@traditions90250.com',
                bcc: emailRecipients
            });
        }

    }

})