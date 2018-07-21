const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message'); 

describe('generateMessage()', function () {
    it('should generate correct message format', () => {
        let message = generateMessage('from', 'text');
        let from = 'from',
            text = 'text';
        
        expect(message).toMatchObject({from, text});
        
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage()', () => {
    it('should generate correct location message object', () => {
        let from = 'From',
            latitude = 123,
            longitude = 456;

        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(typeof message.createdAt).toBe('number');
    });
});