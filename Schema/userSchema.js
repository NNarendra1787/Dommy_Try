const mongoose = require('mongoose');
// const Schema = mongoose.Schema; 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "you forgot to enter username between 1-23"],
        minLength: [3, "you should be given your username geterthan 2"],
        maxLenght: [23, "you need to give username less than 23"],
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "password should be alfanumaric like Abc@123"],
        minLength: [8, "you should right passwod greater than 8"]
    }

})

const user = mongoose.model("userDetail", userSchema);

module.exports = user;