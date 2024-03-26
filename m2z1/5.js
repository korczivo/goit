const express = require('express')
const app = express()

const routes = require('./5-router')
const authorize = (req, res, next) => {
    if(req.query.token === '111'){
        next()
    } else {
        res.send('no access')
    }
}

const middleware = (req, res, next) => {
    console.log('middleware logic')
    next()
}

app.use('/api', authorize, routes)

app.get('/', middleware, (req, res) => {
    res.send('main page')
})

// app.route('/contact')
//     .get((req, res) => {
//         res.send('get method')
//     })
//     .post((req,res)=> {
//         res.send('post method')
//     })

app.listen(8000, () => {
    console.log("I'm listening on 8000 port.")
})