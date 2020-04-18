'use strict';
const express = require('express');
const app = express();
const cors = require('cors')
const cacheControl = require('express-cache-controller')
app.use(cors());
app.use(cacheControl());

// Require all RESTFULL API Routes
app.use('/api', require('./routes/index'));

//ToDo: Uitzoeken wat dit doet
app.get('/memsize', (req, res) => {
    res.send(`memsize=${cache.memsize()}`);
});

//ToDo: Uitzoeken wat dit doet
app.post('/memclear', (req, res) => {
    cache.clear();
    res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
