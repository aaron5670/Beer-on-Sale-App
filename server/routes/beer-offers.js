const express = require("express");
const router = express.Router();
const cache = require('memory-cache')
const getAanbiedingen = require('../scrapper/scraper')

/* GET home page. */
router.get("/", async function (req, res, next) {
    res.json({
        'result': 'Private dutch beer offers API'
    });
});

router.post('/aanbiedingen', async (req, res) => {
    if (req.body.password !== 'uM|2jX|G|Ir$H;*>Z&=YaSK`J"K2;`+i')
        return res.status(401).json({error: 'Unauthorized'});

    const cached = cache.get('bier-merken');
    if (Boolean(cached))
        return res.json(cached);

    const data = await getAanbiedingen();
    cache.put('bier-merken', data, 1000 * 3600 * 24); // Store for a day
    res.cacheControl = {
        maxAge: 3600,
    };

    return res.json(data);
});

module.exports = router;
