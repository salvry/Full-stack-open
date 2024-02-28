const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('returning users', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('returns initial users', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })
})

describe('adding users', () => {
    test('adding a valid user succeeds', async () => {
        await api
            .post('/api/users')
            .send({ username: "pätkis", password: "salasana", name: "Pekka" })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        console.log(users)
        expect(users).toHaveLength(helper.initialUsers.length + 1)
        const userNames = users.map(user => user.username)
        expect(userNames).toContain('pätkis')
    })
    test('does not add a user if password is too short', async () => {
        const user = new User({ username: "pät", password: "12", name: "Pekka" })
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)

    })
    test('does not add a user without username', async () => {
        const user = new User({ password: "salasana", name: "Pekka" })
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)

    })
    test('does not add a user if username is too short', async () => {
        const user = new User({ username: "p", password: "salasana", name: "Pekka" })
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)

    })
    test('does not add a user if username is already taken', async () => {
        const user = new User({ username: "masa", password: "salasana", name: "Matias" })
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)

    })


})

afterAll(() => {
    mongoose.connection.close()
})