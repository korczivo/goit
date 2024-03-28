const express =require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: ['https://www.google.com'],
    methods: ['GET'],
    // exposedHeaders
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('GET')
})

app.post('/', (req, res) => {
    res.send('POST')
})

app.delete('/', (req, res) => {
    res.send('DELETE')
})


app.listen(8000, () => {
    console.log('Server is running on port 8000');
})