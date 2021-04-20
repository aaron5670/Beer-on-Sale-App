import React, {useState, useEffect} from 'react';
import {
    IonCol,
    IonContent, IonGrid,
    IonHeader, IonPage, IonRow, IonSelect, IonSelectOption
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
            let store = [], brands = [];
            const response = await fetch(`http://localhost:3006/api/aanbiedingen?token=gYTXwX2TK4sSGwJMq5XnZeR7cqRlXtG0T8sjY5Sai3p8uox6863qkeq8PHEvMHfW`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            setBeerOffers(data.discounts);
            data.discounts.map(offer => store.push(offer.store) && brands.push((offer.name)))
            setStores(store.filter((item, pos) => store.indexOf(item) === pos))
            setBrands(brands.filter((item, pos) => brands.indexOf(item) === pos))

            setTimeout(() => {
                setIsLoading(false)
            }, 500)
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

    const headerNav = () => {
        return (
            <div className={"h-50 bg-blue-600"}>
                <h1 className="font-mono text-2xl font-bold text-white pt-3 pl-3">
                    Aanbiedingen
                </h1>

                {filterComponent()}
            </div>
        )
    };

    const filterComponent = () => (
        <IonGrid>
            <IonRow className={'text-white'}>
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
                                   setFilteredOffers(beerOffers.filter(offer => offer.name === e.detail.value))
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
            <IonHeader>
                {headerNav()}
            </IonHeader>

            <IonContent>

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
                                  beerImage={beerImages[product.beerImage]?.default}
                                  store={product.store}
                                  storeImage={storeImages[product.storeImage]}/>
                        )) : beerOffers.map((product, i) => (
                            <Card key={i}
                                  name={product.name}
                                  description={product.description}
                                  price={product.price}
                                  date={product.date}
                                  beerImage={beerImages[product.beerImage]?.default}
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
