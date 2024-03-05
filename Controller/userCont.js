const user = require('../Schema/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const SaltRound = 12;

const RegisterUser = async(req, res)=>{
    const RgData = req.body;
    const {username, email, password, userId} = RgData;
    const userData = await user.findOne({email: email});

    if(userData){
        return res.send({msg: "User is alrady Registerd"});
    }
    else {
        const salt = bcrypt.genSaltSync(SaltRound);
        const hashPassword = bcrypt.hashSync(password, salt);
        const token = await jwt.sign({email: email}, process.env.SecreateKey,{expiresIn: '15d'})

        const superObj = await user({
            username: username,
            email: email,
            password: hashPassword,
        })

        const Result = await superObj.save();
        return res.send({
            msg: "User Registed Successfully",
            userId: Result._id,
            token: token,
            username: username,
            email: email,
            Result: Result,
        })
    }
}

const LoginUser = async(req, res)=>{
    const LgData = req.body;
    const {email, password} = LgData;
    const userData = await user.findOne({email: email});

    if(userData){
        const hashPassword = userData.password;
        const validate = bcrypt.compareSync(password, hashPassword);
        const token = jwt.sign({email: email}, process.env.SecreateKey, {
            expiresIn: "90d"
        })

        if(validate){
            return res.send({
                msg: "User Login Successfully",
                token: token,
                userData: userData
            })
        }
        else{
            return res.send({
                msg: "Invalid Credential",
            })
        }
    }
    if(!userData){
        return res.send({
            msg: "User not Registed please register first"
        })
    }
}

module.exports = {
    RegisterUser,
    LoginUser,
}