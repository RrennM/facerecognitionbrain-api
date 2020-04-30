const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

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
        res.json('Success')
    } else {
        res.status(400).json('Error logging in.')
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash)
    // });
    database.users.push({   
        id: database.users.length + 1,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        // console.log(typeof user.id, user.id, typeof id, id);
        if ( user.id.toString() === id ) {
            found = true;
            return res.json(user);
        } 
    })

    if ( !found ) {
        res.status(404).json('No such user.');
    }
})

app.post('/image', (req, res) => {
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