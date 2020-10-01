const express = require("express")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth_routes");
const userRoutes = require("./routes/user_routes");
const passportSetup = require('./config/passport_setup')
const cookieSession = require('cookie-session');
const passport = require("passport");


// DB Connection
mongoose.connect("mongodb://localhost:27017/ReserveIt", { useNewUrlParser: true, useUnifiedTopology: true })
let db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});

//get Express functionalities to app
const app = express();

//***** Middleware Operations *****

//cookie encryption
app.use(cookieSession({
    name:'Reserve It',
    maxAge: 1*60*60*1000,
    keys: ['ranmalc6h12o6dewage']
}))
//initialize passort session handling
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());

//enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:1234");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


//base url
app.get('/', (req, res) => {
    res.status(200).json({ status: true })
})

//Navigate to mentioned route
app.use("/auth", authRoutes);
app.use("/profile", userRoutes);

//port server listens
app.listen(3000, () => { console.log('Server Satrted at port 3000') })