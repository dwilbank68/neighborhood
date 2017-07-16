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
            // if there is a picture url, append it to email body too
            // if (needPicture.length > 0) {
            //     body = body
            //         +'\n\n' + needPicture;
            // }

            // twilio.sendSms({
            //     to:'+18186489466',
            //     from: Meteor.settings.TWILIO_NUMBER,
            //     body: body.substring(0,159)
            // }, function(err, responseData) { //this function is executed when a response is received from Twilio
            //     if (!err) {
            //         console.log(responseData.from);
            //         console.log(responseData.body);
            //     } else {
            //         console.log('err ',err);
            //     }
            // });
            for(var i = 0; i < SMSRecipients.length; i++){
                console.log('------------------------------------------');
                console.log('SMSRecipients[i] ',SMSRecipients[i]);
                console.log('------------------------------------------');
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