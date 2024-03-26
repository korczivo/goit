const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'public4')))

// app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/contact/:id', (req, res) => {
    console.log(req.params)
    res.send(`contact page with id: ${req.params.id}`)
})

app.get('/contact/:id/:name', (req, res) => {
    console.log(req.params)
    res.send(`contact page with id: ${req.params.id}`)
})

app.get('/login', (req, res) => {
    console.log(req.body)
    console.log(req.query)
    res.json(req.body)
})

app.get('/users', (req, res) => {
    res.send(JSON.stringify(req.query))
})



app.listen(8000, () => {
    console.log("I'm listening on 8000 port.")
})

// http://localhost:8000/users?id=5&id=7
// http://localhost:8000/users?id[]=5&id[]=7
// http://localhost:8000/users?id[1]=5&id[0]=7
// http://localhost:8000/users?id[‘test1’]=5&id[‘test2’]=7