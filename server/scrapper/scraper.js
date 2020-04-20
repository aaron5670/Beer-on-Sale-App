const cheerio = require("cheerio");
const axios = require("axios");

const fetchData = async (siteURL) => {
    const result = await axios.get(siteURL);
    return cheerio.load(result.data, {
        normalizeWhitespace: true,
        xmlMode: true
    });
};

const getDiscounts = async () => {
    const siteUrl = "https://www.bierindeaanbieding.nl/bier/aanbiedingen/kratten";
    const $ = await fetchData(siteUrl);

    let discounts = [];

    $("table tr").each((index, element) => {
        let product = {};
        let name = ($(element).find('td').eq(1).find('tr').first().find('a').text());
        let description = ($(element).find('td').eq(1).find('tr').eq(1).find('td').text());
        let price = ($(element).find('td').eq(1).find('tr').eq(3).find('strong').text());
        let validUntilDate = ($(element).find('td').eq(1).find('tr').eq(5).find('td').text());
        let beerImage = ($(element).find('td').eq(0).find('img').attr('src'));
        let store = ($(element).find('table').eq(1).find('img').attr('alt'));
        let storeImage = ($(element).find('table').eq(1).find('img').attr('src'));

        if (name !== "") {

            // Because the scrapping website is really a mess with unclosed HTML brackets, I need to fix it...
            store = store.replace(/(\r\n|\n|\r)/gm, "");
            store = store.replace(/<\/?[^>]+(>|$)/g, "");
            store =  store.trimRight();
            price = price.replace(".", ",");
            let beerImageV2 = beerImage.replace("/images/kratten/", "")

            product.name = name;
            product.description = description;
            product.price = price;
            product.date = validUntilDate;
            product.beerImage = `https://www.bierindeaanbieding.nl${beerImage}`;
            product.beerImageV2 = `${beerImageV2}`;
            product.store = store;
            product.storeImage = `https://www.bierindeaanbieding.nl${storeImage}`;
            discounts.push(product);
        }
    });

    return {
        discounts: [...discounts],
    };
};

module.exports = getDiscounts;
