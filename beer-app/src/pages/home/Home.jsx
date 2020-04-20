import React, {useState, useEffect} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import Card from "../../components/Card";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [beerOffers, setBeerOffers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://aaronvandenberg.nl:3006/api/aanbiedingen", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password: 'uM|2jX|G|Ir$H;*>Z&=YaSK`J"K2;`+i'})
            });
            response.json()
                .then(res => setBeerOffers(res.discounts))
                .catch(err => console.log(err));
        }

        fetchData();
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    }, []);

    return (
        <IonPage>
            <IonHeader mode={"ios"}>
                <IonToolbar>
                    <IonTitle>Bier aanbiedingen</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {isLoading ?
                    <>
                        <Card isLoading={true}/>
                        <Card isLoading={true}/>
                    </>
                    :
                    beerOffers.map((product, i) => (
                        <Card key={i}
                              name={product.name}
                              description={product.description}
                              price={product.price}
                              date={product.date}
                              beerImage={product.beerImage}
                              store={product.store}
                              storeImage={product.storeImage}/>
                    ))
                }
            </IonContent>
        </IonPage>
    );
};

export default Home;
