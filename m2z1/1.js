const express = require('express')

const app = express()

app.get('/', (req, res) => {
    console.log('get endpoint')
    res.send('hello world')
})

// app.post('/', (req, res) => {
//     res.send('post')
// })

// app.get('/con+tact', (req, res)=> {
//     res.send('contact page')
// })

// app.get('/con?tact', (req, res)=> {
//     res.send(`contact page ? ${req.originalUrl}`)
// })

app.get('/con*tact', (req, res)=> {
    res.send(`contact page * ${req.originalUrl}`)
})
app.listen(8000, () => {
    console.log("I'm listening on 8000 port")
})