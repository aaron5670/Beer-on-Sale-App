import getBeerOffers from "../helpers/scraper";

module.exports = async (req, res) => {
    if (req.query.token !== 'gYTXwX2TK4sSGwJMq5XnZeR7cqRlXtG0T8sjY5Sai3p8uox6863qkeq8PHEvMHfW')
        return res.status(401).json({error: 'Unauthorized'});

    let data = await getBeerOffers(res);

    let stores = [];
    data.discounts.map((offer, index) => {
        stores.push(offer.store)
    })

    stores = stores.filter((item, pos) =>
        stores.indexOf(item) === pos
    )

    return res.json(stores);
}
