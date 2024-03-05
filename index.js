const express = require('express');
const ConnectToDB = require('./Db/Connection');
const router = require('./Routes/userRoute');
const app = express();
const cors = require('cors')
// const Port = 4520;
require('dotenv').config()
app.use(express.json())

app.use(cors({
    origin: "*"
}))

app.get('/home', (req, res)=>{
    res.send("Hello To Work")
})

app.use('/user', router)

const Connection = async ()=>{
    try{
        await ConnectToDB(process.env.Mongo_url);
        app.listen(process.env.Port, ()=>{
            console.log(`Server is running on ${process.env.Port}`);
        })
    }
    catch(err){
        console.log()
    }
}

Connection();


