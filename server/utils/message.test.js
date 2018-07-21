const expect = require('expect');
const {generateMessage} = require('./message'); 

describe('generateMessage()', function () {
    it('should generate correct message format', () => {
        let message = generateMessage('from', 'text');
        let from = 'from',
            text = 'text';
        
        expect(message).toMatchObject({from, text});
        
        expect(typeof message.createdAt).toBe('number');
    });
});