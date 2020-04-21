import React, {useState, useEffect} from 'react';
import {
    IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonPage, IonRow, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import Card from "../../components/Card";

const Home = () => {
    const beerImages = importAll(require.context('../../../src/assets/images/kratten', false, /\.(png|jpe?g|svg)$/));
    const storeImages = importAll(require.context('../../../src/assets/images/winkels', false, /\.(png|jpe?g|svg)$/));
    const [isLoading, setIsLoading] = useState(true);
    const [beerOffers, setBeerOffers] = useState();
    const [stores, setStores] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState();
    const [filteredStore, setFilteredStore] = useState();
    const [filteredBrand, setFilteredBrand] = useState();

    useEffect(() => {
        async function fetchOffers() {
            const response = await fetch("https://aaronvandenberg.nl:3006/api/aanbiedingen", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password: 'uM|2jX|G|Ir$H;*>Z&=YaSK`J"K2;`+i'})
            });
            response.json()
                .then(res => {
                    setBeerOffers(res.discounts)
                    return res
                })
                .then((res) => {
                    let store = [];
                    res.discounts.map((offer, index) => {
                        store.push(offer.store)
                    })
                    setStores(store.filter((item, pos) => store.indexOf(item) === pos))
                    return res;
                })
                .then((res) => {
                    let brands = [];
                    res.discounts.map((offer, index) => {
                        brands.push(offer.name)
                    })
                    return setBrands(brands.filter((item, pos) => brands.indexOf(item) === pos))
                })
                .then(() => setTimeout(() => {
                    setIsLoading(false)
                }, 500))
                .catch(err => console.log(err));
        }

        fetchOffers();
    }, []);


    function importAll(imagesDirectory) {
        let images = {};
        imagesDirectory.keys().forEach((item) => {
            images[item.replace('./', '')] = imagesDirectory(item);
        });
        return images;
    }

    const filterComponent = () => (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonSelect interface={"popover"}
                               mode={"ios"}
                               value={filteredStore}
                               placeholder="Selecteer winkel"
                               onIonChange={e => {
                                   setFilteredStore(e.detail.value)
                                   setFilteredOffers(beerOffers.filter(offer => offer.store === e.detail.value))
                               }}>
                        {stores.map((filteredStore, i) =>
                            <IonSelectOption key={i} value={filteredStore}>{filteredStore}</IonSelectOption>
                        )}
                    </IonSelect>
                </IonCol>
                <IonCol>
                    <IonSelect interface={"popover"}
                               mode={"ios"}
                               value={filteredBrand}
                               placeholder="Selecteer merk"
                               onIonChange={e => {
                                   setFilteredBrand(e.detail.value)
                               }}>
                        {brands.map((filteredBrand, i) =>
                            <IonSelectOption key={i} value={filteredBrand}>{filteredBrand}</IonSelectOption>
                        )}
                    </IonSelect>
                </IonCol>
            </IonRow>
        </IonGrid>
    )

    return (
        <IonPage>
            <IonHeader mode={"ios"}>
                <IonToolbar>
                    <IonTitle>Bier aanbiedingen</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>

                {filterComponent()}

                <>
                    {isLoading ?
                        <>
                            <Card isLoading={true}/>
                            <Card isLoading={true}/>
                        </>
                        :
                        filteredOffers ? filteredOffers.map((product, i) => (
                            <Card key={i}
                                  name={product.name}
                                  description={product.description}
                                  price={product.price}
                                  date={product.date}
                                  beerImage={beerImages[product.beerImage]}
                                  store={product.store}
                                  storeImage={storeImages[product.storeImage]}/>
                        )) : beerOffers.map((product, i) => (
                            <Card key={i}
                                  name={product.name}
                                  description={product.description}
                                  price={product.price}
                                  date={product.date}
                                  beerImage={beerImages[product.beerImage]}
                                  store={product.store}
                                  storeImage={storeImages[product.storeImage]}/>
                        ))
                    }
                </>
            </IonContent>
        </IonPage>
    );
};

export default Home;
