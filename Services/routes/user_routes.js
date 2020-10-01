// all routes with http://localhost:3000/profile comes to this
const express = require("express")
const route = express.Router();
const { google } = require('googleapis');
const fs = require("fs");
const path = require('path');
var pathToJson_1 = path.resolve(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(pathToJson_1));


//validate date and time sent by client to make google calendar events
const datetimeValidatorStart = (date, time) => {

    var time_details = time.split(':')
    var date = new Date(date)
    date.setHours(time_details[0], time_details[1], 00)

    var time_check = parseInt(time_details[0])
    var time_with_sign

    if (time_check < 12) {
        if (time_check == 0) {
            var adjusted_time = parseInt(time_details[0]) + 12
            time_with_sign = adjusted_time.toString() + ":" + time_details[1] + ' AM'
        }
        else {
            time_with_sign = time + ' AM'
        }
    }
    else {
        if (time_check == 12) {
            time_with_sign = time + ' PM'
        }
        else {
            var adjusted_time = parseInt(time_details[0]) - 12
            time_with_sign = adjusted_time.toString() + ":" + time_details[1] + ' PM'
        }
    }

    return [date, time_with_sign]
}

//validate  date and time sent by client to make google calendar events
const datetimeValidatorEnd = (date, time) => {

    var time_details = time.split(':')
    var date = new Date(date)
    var time_with_sign = ''

    var time_check = parseInt(time_details[0])
    date.setHours(time_check + 2, time_details[1], 00)

    return [date, time_with_sign]
}

// check whether user is already authenticated
const userAuthValidation = (req, res, next) => {
    if (!req.user) {
        res.status(403).json({ status: false })
    }
    else {
        next()
    }
}

//create meta information need for the email
function emailBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = new Buffer.from(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
}

// base route  of the http://localhost:3000/profile 
route.get("/", userAuthValidation, (req, res) => {
    try {
        res.status(200).json({ status: true, name: req.user.firstName })
    } catch (err) {
        res.status(500).json(err)
    }
})

// route that responsible to send email from user's email and create a google calendar event 
route.post("/reserve", userAuthValidation, (req, res) => {

    try {
        var uName = req.user.firstName + " " + req.user.lastName

        // validate and adjust date and time for google calendar event and gmail description
        var validated_start_datetime = datetimeValidatorStart(req.body.date, req.body.time)
        var validated_end_datetime = datetimeValidatorEnd(req.body.date, req.body.time)

        var receiver_email

        if (req.body.hotel == 'Shangri-La Hotel') {
            receiver_email = 'shangrila.reservation.lk@gmail.com'
        }
        else if (req.body.hotel == 'Jetwing Hotel') {
            receiver_email = 'jetwing.reservation.lk@gmail.com'
        }
        else {
            receiver_email = 'cinnamon.reservation.lk@gmail.com'
        }

        //  create message content
        var messageContent = "Dear Reservation Manager,\n\n Please arrange a reservation with following deatils.\n\
** Dedicated high prioritize reservation slot given by your hotel to RESERVE IT App is indicated as 'Reservation ID' **\n\n\
Reservation ID : "+ req.body.id + "\nReservation Name : " + uName + "\nCity : " + req.body.city + "\nHotel : " + req.body.hotel + "\nDate : " + req.body.date + "\n\
Time : "+ validated_start_datetime[1] + "\nNumber of Persons : " + req.body.persons + "\n\nThank You."

        // create calendar event details
        var eventDetails = {
            summary: 'Reservation in ' + req.body.hotel + ' (' + req.body.id + ')',
            location: req.body.city,
            description: 'Reservation in ' + req.body.hotel + ' for ' + req.body.persons + ' persons at ' + validated_start_datetime[1],
            start: {
                dateTime: validated_start_datetime[0],
                timeZone: "Asia/Colombo"
            },
            end: {
                dateTime: validated_end_datetime[0],
                timeZone: "Asia/Colombo"
            }
        }

        //read token details from saved token files
        var pathToJson_2 = path.resolve(__dirname, '../tokens.json');
        const tokens = JSON.parse(fs.readFileSync(pathToJson_2));

        const { client_secret, client_id, redirect_uris } = credentials.installed

        //create OAuth object including OAuth Client credetials adredirect urls
        const oAuth2Client = new google.auth.OAuth2(client_id,
            client_secret,
            redirect_uris[0])

        //  set the token details read from tokens file to OAuth object
        oAuth2Client.setCredentials(tokens)

        // call gmail sending API
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client })
        var raw = emailBody(receiver_email, req.user.email, 'Reservation via RESERVE IT', messageContent)

        gmail.users.messages.send({
            userId: 'me',
            resource: {
                raw: raw
            }
        }, (err, res) => {
            if (err) {
                console.log('The API returned an error: ' + err)
                throw err
            }
            console.log('Email Status : ' + res.status)
            console.log('Email Status Text : ' + res.statusText)
        })

        // call create google calendar event API
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
        calendar.events.insert({
            calendarId: 'primary',
            resource: eventDetails
        }, (err, res) => {
            if (err) {
                console.log('The API returned an error: ' + err)
                throw err
            }
            console.log('Calendar Event Status : ' + res.status)
            console.log('Calendar Event Status Text : ' + res.statusText)
        });

        // send success rensponse to the client
        res.status(201).json({ status: true })

    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = route;