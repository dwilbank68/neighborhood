import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {validateNewUser} from './users';

if (Meteor.isServer) {
    describe('users', function() {

        const validUser = {
            emails: [
                {address:'validemail@example.com'}
            ]
        }

        const userBadEmail = {
            emails: [
                {address:'bleh'}
            ]
        }

        it('should allow valid email', function () {
            const result = validateNewUser(validUser)
            expect(result).toBe(true);
        });

        it('should reject invalid email', function () {
            expect(() => {validateNewUser(userBadEmail)}).toThrow();
        });



    });
}


