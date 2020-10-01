const mongoose = require("mongoose");

let usersSchema = mongoose.Schema({
    googleId: String,
    email: String,
    firstName: String,
    lastName: String,
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;