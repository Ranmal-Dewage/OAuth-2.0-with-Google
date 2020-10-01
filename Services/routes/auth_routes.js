// all routes with http://localhost:3000/auth comes to this
const express = require("express")
const route = express.Router();
const passport = require('passport')


// route responsible for setting scope and redirect user to authentication and consent screen
route.get("/google", passport.authenticate('google', {
    scope: ['profile',
        'email',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/calendar.events'
    ],
    accessType: 'offline',
    prompt: 'consent'
}))

// logout routes by clearing session cookie details
route.get("/logout", (req, res) => {

    try {
        req.logout()
        res.redirect('http://localhost:1234/')
    } catch (err) {
        res.status(500).json(err)
    }

})

//  route that is redirect to after obtaining code and resposible to obtain and saving tokens
route.get("/google/redirect", passport.authenticate('google'), (req, res) => {

    try {
        res.redirect('http://localhost:1234/home')
    } catch (err) {
        res.status(500).json(err)
    }

})


module.exports = route;