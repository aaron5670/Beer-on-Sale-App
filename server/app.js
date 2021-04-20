'use strict';
const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const cacheControl = require('express-cache-controller')

// Cors middleware
app.use(cors({origin: true, credentials: true}));
app.options("*", cors({origin: true, credentials: true}));

// BodyParser middleware
app.use(bodyParser.json({limit: '2mb'}));

// Cache middleware
app.use(cacheControl());

// Include all RESTFULL API Routes
app.use('/api', require('./routes/beer-offers'));

//ToDo: Uitzoeken wat dit doet
app.get('/memsize', (req, res) => {
    res.send(`memsize=${cache.memsize()}`);
});

//ToDo: Uitzoeken wat dit doet
app.post('/memclear', (req, res) => {
    cache.clear();
    res.sendStatus(200);
});

// SSL Certificate
// const privateKey = fs.readFileSync('/opt/psa/var/modules/letsencrypt/etc/live/aaronvandenberg.nl/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/opt/psa/var/modules/letsencrypt/etc/live/aaronvandenberg.nl/cert.pem', 'utf8');
// const ca = fs.readFileSync('/opt/psa/var/modules/letsencrypt/etc/live/aaronvandenberg.nl/chain.pem', 'utf8');
//
// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
// };
//
// const httpsServer = https.createServer(credentials, app);

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3006;
httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
