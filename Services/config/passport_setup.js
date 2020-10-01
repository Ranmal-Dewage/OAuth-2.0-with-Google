const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const Users = require("../models/users");
const fs = require("fs");
const path = require('path');
var pathToJson = path.resolve(__dirname, './credentials.json');
const config = JSON.parse(fs.readFileSync(pathToJson));

// serialize user.id and attach it in web browsers as session cookies to identify logged in users
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// deserialize user.id attach in session cookies send to the server and check whether its a valid user ID and attch user object
//from DB to req objectif valid
passport.deserializeUser((id, done) => {

    const query = { _id: id }
    Users.findOne(query, (err, user) => {
        if (err) {
            res.status(500).json(err);
        } else {
            done(null, user)
        }
    })
})

//Google Stratergy for Passport JS to make OAuth flow
passport.use(
    new GoogleStrategy({
        clientID: config.installed.client_id,
        clientSecret: config.installed.client_secret,
        callbackURL: config.installed.redirect_uris[0]
    }, (accessToken, refreshToken,otherTokenDetails, profile, done) => {

        // extract access token details
        let tokens = {
            access_token: accessToken,
            refresh_token: refreshToken,
            scope: otherTokenDetails.scope,
            token_type: otherTokenDetails.token_type,
            expiry_date:otherTokenDetails.expires_in
        }
        // save token details in a file
        let data = JSON.stringify(tokens);
        fs.writeFileSync('./tokens.json', data);

        //serach for exsistence of user in DB
        const query = { googleId: profile.id }
        Users.findOne(query, (err, user) => {
            if (err) {
                res.status(500).json(err);
            } else {
                if (user) {
                    console.log("Found User")
                    console.log(user)
                    done(null, user)
                } else {
                    //  create a new user and persist in DB if user doesn't exist
                    let userDetails = {
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName
                    }
                    let users = new Users(userDetails);
                    users.save((err, user) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            console.log("Created")
                            console.log(user)
                            done(null, user)
                        }
                    });
                }
            }
        })

    })
)