import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {validateNewUser} from './users';

if (Meteor.isServer) {
    describe('users', function() {

        const validUser = {
            address: '1234 Happy Street',
            emails: [
                {address:'validemail@example.com'}
            ]
        }

        const userBadEmail = {
            address: '1234 Happy Street',
            emails: [
                {address:'bleh'}
            ]
        }

        const userBadAddress = {
            address: '',
            emails: [
                {address:'validemail@example.com'}
            ]
        }

        it('should allow valid email and street address', function () {
            const result = validateNewUser(validUser)
            expect(result).toBe(true);
        });

        it('should reject invalid email', function () {
            expect(() => {validateNewUser(userBadEmail)}).toThrow();
        });

        it('should reject invalid address', function () {
            expect(() => {validateNewUser(userBadAddress)}).toThrow();
        });

    });
}


