const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

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
    if( req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password ) {
        res.json('Success')
    } else {
        res.status(404).json('Error logging in.')
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
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

app.listen(3000, () => {
    console.log("Server is running on port 3000!")
});

/*
/ --> res = this is working!
/signin --> POST = success/fail
/register --> POST = user
/profile/userid -- > GET = user
/image --> PUT = updated user object or count

*/