const express = require('express')

const userModel = require('../models/User')
const verifyToken = require('./verifyToken')

const router = express.Router()

router.post('/addTodo', verifyToken, async (req, res)=>{
    await userModel.findById(req.user._id, (err, oldUser)=>{
        if (err) return res.status(400).send(err)
        oldUser.todo.unshift({Subject: req.body.Subject, Description: req.body.Description})
        oldUser.save((err, thisUser)=>{
            if (err) return res.status(400).send(err)
            res.status(200).send('ok')
        });
    })
})
router.post('/updateTodo', verifyToken, async(req, res)=>{
    const newTodoList = req.body.todo
    await userModel.findById(req.user._id, (err, oldUser)=>{
        if (err) return res.status(400).send(err)
        oldUser.todo = newTodoList
        oldUser.save((err, thisUser)=>{
            if (err) return res.status(400).send(err)
            res.status(200).send('ok')
        });
    })
})



module.exports = router