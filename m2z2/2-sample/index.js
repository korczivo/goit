const logger = require('morgan');
const express = require('express');
const app = express();
require('dotenv').config();

// app.use(logger('combined'))
app.use(logger('dev'))
// app.use(logger('common'))
// app.use(logger('short'))
// app.use(logger('tiny'))
// app.use(logger(':method :url :status :res[content-length] - :response-time ms'))
//
app.get('/', (req, res)=> {
    res.send('hello')
    }
)
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})