const mongoose = require('mongoose');

const ConnectToDB = (url)=>{
    mongoose.connect(url)
    .then(()=> console.log("Mongoose Connected Successfully"))
    .catch((err)=> console.log(err))
}

module.exports = ConnectToDB