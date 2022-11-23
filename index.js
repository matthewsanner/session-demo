const express = require('express')
const app = express();
const session = require('express-session')

// resave defaults to true but deprecated, same for saveUninitialized, may want true for these depending on the data store you are using
const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
// check sessions docs for many options to pass in
app.use(session(sessionOptions))

// by default stores info in MemoryStore which is not safe for production, only for developing, would need to use a compatible session store, such as connect-redis or connect-mongo
app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`)
})

app.get('/register', (req, res) => {
    // ='Anonymous' is a default entry here if user doesn't enter something in a query string in the URL after register
    const { username = 'anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/greet')
})

// username will be stored in session attached to cookie on particular machine but will reset if server is reset because for now it's just saving to a local memory store
app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`Welcome back, ${username}`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})