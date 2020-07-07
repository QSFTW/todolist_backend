const router = require('express').Router()
const userModel = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const verifyToken  = require('./verifyToken')
const {registerValidation, loginValidation} = require('../validation')


router.post('/register', async (req, res) =>{
    // Validate
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Check whether email exists already
    const emailExists = await userModel.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send('Email already exists')

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hash
    })
    try{
        const savedUser = await user.save()
        savedUser.password = ''
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res)=>{
    // Validate
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Check whether email exists already
    const user = await userModel.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Wrong Email or Password')


    // Check whether password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) res.status(400).send('Wrong Email or Password')

    // create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.status(200).json({
        username: user.username,
        _id: user._id,
        auth_token: token,
        todo: user.todo
    })
})

router.get('/auth', verifyToken, async (req, res)=>{
    const user = await userModel.findById(req.user._id);
    res.status(200).json({
            username: user.username,
            _id: user._id,
            todo: user.todo
        })
}
)

module.exports = router