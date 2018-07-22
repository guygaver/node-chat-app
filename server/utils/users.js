// addUser(id, name, room)
// removeUser()
// getUser(id)
// getUserList(room)

class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);

        if ( user ) {
            this.users = this.users.filter(u => u.id !== user.id);
        }
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let names = users.map(user => user.name);

        return names;
    }
}

module.exports = {Users};