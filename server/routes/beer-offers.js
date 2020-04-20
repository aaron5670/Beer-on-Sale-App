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

const getBeerOffers = async (res) => {
    const cached = cache.get('bier-merken');
    let data;
    if (Boolean(cached)) {
        data = cached
    } else {
        data = await getAanbiedingen();
        cache.put('bier-merken', data, 1000 * 3600 * 24); // Store for a day
        res.cacheControl = {
            maxAge: 3600,
        };
    }
    return data;
}

router.post('/aanbiedingen', async (req, res) => {
    if (req.body.password !== 'uM|2jX|G|Ir$H;*>Z&=YaSK`J"K2;`+i')
        return res.status(401).json({error: 'Unauthorized'});

    let data = await getBeerOffers(res);
    return res.json(data);
});

router.get('/winkels', async (req, res) => {
    let data = await getBeerOffers(res);

    let stores = [];
    data.discounts.map((offer, index) => {
        stores.push(offer.store)
    })

    stores = stores.filter((item, pos) =>
        stores.indexOf(item) === pos
    )

    return res.json(stores);
});

router.get('/merken', async (req, res) => {
    let data = await getBeerOffers(res);

    let brands = [];
    data.discounts.map((offer, index) => {
        brands.push(offer.name)
    })

    brands = brands.filter((item, pos) =>
        brands.indexOf(item) === pos
    )

    return res.json(brands);
});

module.exports = router;
