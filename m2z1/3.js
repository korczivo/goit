const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.locals.startTime = new Date().getTime()
    next()
})

app.get('/1', (req, res, next)=> {
    setTimeout(() => {
        res.send('hello from 1')
        next()
    }, 200)
})

app.get('/2', (req, res, next)=> {
    res.send('hello from 2')
    next()
})

app.use((req, res, next) => {
    // console.log('after', res.locals.startTime)
    console.log(`${req.method} | ${req.originalUrl} | ${new Date().getTime() - res.locals.startTime}ms`)
})

app.listen(8000, () => {
    console.log("I'm listening on 8000 port.")
})