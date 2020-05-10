const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'test',
        database : 'smartbrain'
    }
    });

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: 1,
            name: 'Tyson',
            email: 'TysonHood@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: 2,
            name: 'Hank',
            email: 'HankBirf@gmail.com',
            password: 'biscuits',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
});

app.post('/signin', (req, res) => {
    // Load hash from your password DB.
    // bcrypt.compare("muffins", '$2a$10$40ZFW.CIdnlB15xSir77sOqBBABBMfRZM2v1rUOVFscRHdxkyu03G', function(err, res) {
    //     // res == true
    //     console.log( 'first guess', res )
    // });
    // bcrypt.compare("veggies", '$2a$10$40ZFW.CIdnlB15xSir77sOqBBABBMfRZM2v1rUOVFscRHdxkyu03G', function(err, res) {
    //     // res = false
    //     console.log( 'second guess', res )
    // });

    if( req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password ) {
        // res.json('Success')
        res.json(database.users[0]);
    } else {
        res.status(400).json('Error logging in.')
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash)
    // });
    // database.users.push({   
    //     id: database.users.length + 1,
    //     name: name,
    //     email: email,
    //     entries: 0,
    //     joined: new Date()
    // })
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(400).json('Unable to register.'));
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    // let found = false;
    // database.users.forEach(user => {
    //     // console.log(typeof user.id, user.id, typeof id, id);
    //     if ( user.id.toString() === id ) {
    //         found = true;
    //         return res.json(user);
    //     } 
    // })
    db.select('*').from('users').where({id})
        .then(user => {
            if(user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('User not found.')
            }
        })
        .catch(err => res.status(400).json('Error getting user.'));

    // if ( !found ) {
        // res.status(400).json('No such user.')
    // }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        console.log(typeof user.id, user.id, typeof id, id);
        if ( user.id === id ) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    })

    if ( !found ) {
        res.status(404).json('No such user.');
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000!")
});