const express = require('express')
const app = express()

app.all('/all', (req, res, next) => {
    console.log('all http methods')
    next()
})


// res.json()

// res.download()
// res.end()
// res.send()
// res.redirect()
// res.render()

app.listen(8000, () => {
    console.log("I'm listening on 8000 port.")
})