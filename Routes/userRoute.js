const { RegisterUser, LoginUser } = require('../Controller/userCont');

const router = require('express').Router();

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
// router.post("/nok", newData)
module.exports = router