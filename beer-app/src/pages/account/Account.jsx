import React from 'react';
import {
    IonContent, IonIcon,
    IonPage
} from '@ionic/react';
import './Account.css';
import {settingsSharp} from "ionicons/icons";

const Account = () => {

    const header = () => {
        const profileData = {src: 'https://placekitten.com/g/300/300', text: 'a picture of a cat'};
        return (
            <div className={"heading-color"}>
                <IonIcon icon={settingsSharp} className={"settings-icon"}/>
                <div
                    className={"w-36 sm:w-48 md:w-64 h-36 sm:h-48 md:h-64 flex flex-col justify-center rounded-full mx-auto transform translate-y-1/2 bg-white"}>
                    <img src={profileData.src}
                         alt={profileData.text}
                         className={"w-32 sm:w-40 md:w-56 h-32 sm:h-40 md:h-56 mx-auto rounded-full shadow-xl"}/>
                </div>
            </div>
        )
    };

    const userInfo = () => {
        return (
            <div className={"container mx-auto py-24 text-center"}>
                <h1 className={"text-2xl font-sans antialiased"}>Aaron van den Berg</h1>
                <p className="font-sans text-lg text-gray-800 text-center">
                    Webdeveloper
                </p>
            </div>
        )
    }

    return (
        <IonPage>
            <IonContent>
                {header()}
                {userInfo()}
            </IonContent>
        </IonPage>
    );
};

export default Account;
