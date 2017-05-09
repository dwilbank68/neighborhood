import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {validateProfile} from './profiles';

if (Meteor.isServer) {
    describe('profiles', function() {

        const profileValid = {
            address: '1234 Happy Street',
            avatar: '',
            emailVisible: true,
            fullName: 'Valido Correcto',
            screenName: 'valido',
            phone: '555-1212',
            userId: '123456789ABC'
        }

        const userId = profileValid.userId;

        it('should allow valid data', function () {
            const result = validateProfile(userId, profileValid)
            expect(result).toBe(true);
        });

        it('should reject invalid address', function () {
            const profileBadAddress = {...profileValid, address:''}
            expect(() => {validateProfile(userId, profileBadAddress)}).toThrow();
        });

        it('should reject missing avatar', function () {
            const profileBadAvatar = {...profileValid, avatar:null}
            expect(() => {validateProfile(userId, profileBadAvatar)}).toThrow();
        });

        it('should reject lengthy screenNames', function () {
            const profileBadScreenName = {...profileValid, screenName:'abcdefghijklmnopqrstuvwxyz'}
            expect(() => {validateProfile(userId, profileBadScreenName)}).toThrow();
        });

        it('should reject lengthy fullNames', function () {
            const profileBadFullName = {...profileValid, fullName:'abcdefghijklmnopqrstuvwxyz1234567890'}
            expect(() => {validateProfile(userId, profileBadFullName)}).toThrow();
        });

        it('should reject a profile without a userId', function () {
            expect(() => {validateProfile(undefined, profileValid)}).toThrow();
        });

    });
}


