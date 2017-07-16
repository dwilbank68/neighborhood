import {Meteor} from 'meteor/meteor';

import { Twilio } from 'meteor/accolver:twilio-meteor';

const twilio = Twilio(
    Meteor.settings.TWILIO_ACCOUNT_SID,
    Meteor.settings.TWILIO_AUTH_TOKEN
);



Meteor.methods({
    'sendSMS'(SMSRecipients, subject, postObj){
    //     // validateMessage(userId, updatesObj);
        if (!SMSRecipients || !subject || !postObj) {
            throw new Meteor.Error('missing arguments for sms');
        }
        if (SMSRecipients.length === 0) {console.log('no SMS recipients');return;}
        if (Meteor.isServer) {
            let {body, email, address, needPicture=''} = postObj;
            // append contact info to the email body
            body = subject
                +'\n\n'+ body
                +'\n\n'+ address +'\n'+ email;

            for(var i = 0; i < SMSRecipients.length; i++){
                if (SMSRecipients[i].length < 16) {continue};
                twilio.messages.create({
                    to: SMSRecipients[i],
                    from: Meteor.settings.TWILIO_NUMBER,
                    body,
                    mediaUrl: needPicture
                }, function(err, res) {
                    if (!err) {
                        console.log(res.from);
                        console.log(res.body);
                    } else { console.log('err ',err); }
                });
            }


        }

    }

})