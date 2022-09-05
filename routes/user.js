const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('users')


router.get('/message', (req, res) => {
    res.render('messages/message')
})

router.post('/message', (req, res) => {
    let errors = []

    if(!req.body.name || typeof req.body.name === undefined || req.body.name === null) {
        errors.push({text: 'Invalid name'})
    }

    if(!req.body.message || typeof req.body.message === undefined || req.body.message === null) {
        errors.push({text: 'Invalid message'})
    }

    if(errors.length > 0) {
        res.send('Error')
    } else {
        const new_message = new User({
            name: req.body.name,
            message: req.body.message
        })

        new_message.save().then(() => {
            req.flash('success_msg', 'Registered message')
            res.redirect('/')
        }).catch(error => {
            req.flash('error_msg', 'Message not registered')
            res.redirect('/')
        })
    }
})

module.exports = router