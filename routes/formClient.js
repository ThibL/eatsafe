const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");

const Client = require('../models/Client')
const Resto = require('../models/Resto')

router.post('/', async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }
    try {
        //const resto = await (await Resto.findById(req.resto.id)).isSelected('-password')
        const newClient = new Client({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        })
        
        const client = await newClient.save();
        res.json(client)
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal server error')
    }
})


module.exports = router