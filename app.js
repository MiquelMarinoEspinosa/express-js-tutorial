//Import package
const express = require('express');
let app = express();

//Route = Http Method + Url
app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello, world', status: 200})
})

// app.post('/', () => {

// })

//Create a server
const port = 3000;
app.listen(port, () => {
    console.log('server has started...');
})

