const expect = require('expect');
const {Users} = require('./users');

describe('Users', function () {
    let users;
    
    beforeEach(() => {
        users = new Users();
        
        users.users = [{
            id: 1,
            name: 'Guy',
            room: 'Node Course'
        }, {
            id: 2,
            name: 'Jen',
            room: 'React Course'
        }, {
            id: 3,
            name: 'Yoda',
            room: 'Node Course'
        }]
    });
    
    it('should add new user', () => {
        let user = {
            id: 4,
            name: 'Test',
            room: 'Test'
        };
        
        users.addUser(user.id, user.name, user.room);
        expect(users.users[3]).toEqual(user);
    });

    it('should remove a user', () => {
        users.removeUser(users.users[0].id);
        expect(users.users.length).toBe(2);
    });

    it('should not remove invalid user', () => {
        users.removeUser(4);
        expect(users.users.length).toBe(3); 
    });

    it('should find a user', () => {
        let user = users.getUser(users.users[0].id);
        expect(user).toEqual(users.users[0]);
    });

    it('should not find invalid user', () => {
        let user = users.getUser(4);
        expect(user).toEqual(undefined);
    });

    it('should return names for node course', () => {
        let userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Guy', 'Yoda']);
    });

    it('should return names for react course', () => {
        let userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });
});