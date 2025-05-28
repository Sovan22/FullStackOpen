const assert = require('node:assert');
const bcrypt = require('bcrypt');
const {test, beforeEach, after, describe} = require('node:test');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/users');
const helper = require('./test_helper');

const api = supertest(app);
// 3 mock users
const initialUsers = [
    {
        username : 'root',
        name : 'root',
        password : 'root',
    },
    {
        username : 'user1',
        name : 'user1',
        password : 'user1',
    },
    {
        username : 'user2',
        name : 'user2',
        password : 'user2',
    },
]

beforeEach(async () => {
    await User.deleteMany({});
    const userObjects = initialUsers.map(user => {
        //password to passwordHash
        const saltRounds = 10
        const passwordHash = bcrypt.hashSync(user.password, saltRounds)
        const newUser = {...user, passwordHash}
        //remove user.password
        delete newUser.password
        return new User(newUser)
    })
    const promiseArray = userObjects.map(user => user.save());
    await Promise.all(promiseArray);
})

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

//get users
test('all users are returned', async () => {
    const response = await api.get('/api/users');
    assert.strictEqual(response.body.length, initialUsers.length);
})
//invalid user
test('creating a user with invalid username returns 400', async () => {
    const newUser = {
        username : 'ro',
        name : 'root',
        password: 'root',
    }
    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    console.log(response.body.error)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, initialUsers.length)
})

//invalid password
test('creating a user with invalid password returns 400', async () => {
    const newUser = {
        username: 'root5',
        name: 'root',
        password: 'ro',
    }
    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    console.log(response.body.error)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, initialUsers.length)
})

after(async () => {
    await mongoose.connection.close();
}) 
