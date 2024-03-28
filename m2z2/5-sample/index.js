const express = require('express')
const app = express()
const Joi = require('@hapi/joi')


app.use(express.json())

const schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(25).required(),
    year: Joi.number().integer().min(1970).max(2030).required(),
})


app.post('/', (req, res)=> {
    const result = schema.validate(req.body)
    if(result.error) {
        res.status(400).json({message: result.error.message})
    } else {
        res.json(result)
    }
})


app.listen(8000, () => {
    console.log('Listening on 8000')
})