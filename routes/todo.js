const express = require('express')

const Todo = require('../models/todoModel')
const router = express.Router();

router.get('/getAll', async (req, res)=>{
    try{
        const todos = await Todo.find()
        res.status(200).send(todos)
    } catch (err) {
        res.json({message: err})
    }

});

router.get('/delete/:id', async (req, res)=>{
    try{
        const removedTodo = await Todo.deleteOne({_id: req.params.id})
            res.status(200).json(removedTodo)
    }catch(err) {
        res.json({message: err})
    }

})

router.post('/add', async (req, res)=>{
    data.unshift({id: idCount, Subject: req.body.Subject, Description: req.body.Description})
    idCount++
    const todo = new Todo({
        Subject: req.body.Subject,
        Description: req.body.Description
    })
    try{
        const savedTodo = await todo.save()
        res.json(savedTodo)
    }catch(err) {
        res.json({message: err})
    }
})

router.post('/editDescription/:id', async (req, res)=>{
    try{
        const updateTodo = await Todo.updateOne({_id: req.params.id},
            {$set: {Description: req.body.Description}})
        res.status(200).json(updateTodo)
    }catch (err) {
        res.json({message: err})
    }
})

module.exports = router