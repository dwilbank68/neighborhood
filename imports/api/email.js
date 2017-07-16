import {Meteor} from 'meteor/meteor';

import { Email } from 'meteor/email';

Meteor.methods({
    'sendEmail'(emailRecipients, subject, postObj){
        // validateMessage(userId, updatesObj);
        if (!emailRecipients || !subject || !postObj) {
            throw new Meteor.Error('missing arguments for email');
        }
        if (Meteor.isServer) {
            let {body, email, address, needPicture=''} = postObj;
            // append contact info to the email body
            body = body +'\n\n'+ '----- Contact Information -----' +'\n\n'+ address +'\n'+ email;
            // if there is a picture url, append it to email body too
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