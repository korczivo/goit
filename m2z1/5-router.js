const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('main path of 5-router.js')
})

router.get('/about', (req, res) => {
    res.send('about path of 5-router.js')
})

module.exports = router;
