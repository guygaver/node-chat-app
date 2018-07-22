const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString()', () => {
    it('should reject non string values', () => {
        let invalidString = 4;
        expect(isRealString(4)).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let invalidString = '       ';
        expect(isRealString(invalidString)).toBe(false);
    });

    it('should allow string with non space values', () => {
        let validString = '   Some random string    ';
        expect(isRealString(validString)).toBe(true);
    });
});