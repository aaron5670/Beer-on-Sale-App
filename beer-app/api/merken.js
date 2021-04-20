import getBeerOffers from "../helpers/scraper";
import allowCors from "../helpers/allowCors";

const handler = async (req, res) => {
    if (req.query.token !== 'gYTXwX2TK4sSGwJMq5XnZeR7cqRlXtG0T8sjY5Sai3p8uox6863qkeq8PHEvMHfW')
        return res.status(401).json({error: 'Unauthorized'});

    let data = await getBeerOffers(res);

    let brands = [];
    data.discounts.map((offer, index) => {
        brands.push(offer.name)
    })

    brands = brands.filter((item, pos) =>
        brands.indexOf(item) === pos
    )

    return res.json(brands);
}

module.exports = allowCors(handler)
