const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
require('dotenv').config()

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(express.json());
app.use(cors())

const db = knex({
  client: 'pg',
  connection: {
    //Local postgress config
    // host: '127.0.0.1',
    // user: 'francjav',
    // password: '',
    // database: 'smart-brain'

    //Heroku config
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

app.post('/signin', (res, req) => { signin.handleSignin(res, req, db, bcrypt) })

app.post('/register', (res, req) => { register.handleRegister(res, req, db, bcrypt) })

app.get('/profile/:id', (res, req) => { profile.handleProfileGet(res, req, db) })

app.put('/image', (res, req) => { image.handleImageEntry(res, req, db) })

app.post('/imageURL', (res, req) => { image.handleAPICall(res, req) })

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})