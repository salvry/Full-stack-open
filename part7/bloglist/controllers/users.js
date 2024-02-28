const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
    const { username, password, name, blogs } = request.body
    if (!password) {
        response.status(400).send({ error: 'password is required' })
    }
    if (!username) {
        response.status(400).send({ error: 'username is required' })
    }
    if (password.length < 3) {
        response.status(400).send({ error: 'password must contain at least 3 characters' })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ username: username, password: passwordHash, name: name, blogs: blogs })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users)
})

module.exports = usersRouter