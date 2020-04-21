import React from "react";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg,
    IonItem,
    IonSkeletonText
} from "@ionic/react";

export default (props) => {
    const loading = props.isLoading;
    return (
        <IonCard mode={"ios"}>
            {loading
                ? <div style={{width: '100%', height: '350px', backgroundColor: '#EEEEEE'}}/>
                : <IonImg src={props.beerImage} alt={props.description} style={{width: '100%'}}/>
            }
            <IonCardHeader>
                {loading
                    ?
                    <>
                        <IonSkeletonText animated style={{width: '80%', height: '15px'}}/>
                        <IonSkeletonText animated style={{width: '65%'}}/>
                    </>
                    :
                    <>
                        <IonCardSubtitle>{props.date}</IonCardSubtitle>
                        <IonCardTitle>{props.name}</IonCardTitle>
                    </>
                }
            </IonCardHeader>

            <IonCardContent>
                {loading
                    ?
                    <>
                        <IonSkeletonText animated style={{width: '65%'}}/>
                    </>
                    :
                    props.description
                }
            </IonCardContent>

            <IonItem lines={"none"} style={{marginBottom: 10}}>
                {loading
                    ?
                    <>
                        <IonSkeletonText animated style={{width: '25%'}}/>
                        <div style={{width: '40px', height: '40px', backgroundColor: '#EEEEEE'}}
                             slot={'end'}/>
                    </>
                    :
                    <>
                        <h1 style={{fontSize: 24}}><b>{props.price}</b></h1>
                        <IonImg src={props.storeImage}
                                alt={props.store}
                                slot={'end'}
                                style={{width: 50, marginRight: 0}}/>
                    </>
                }
            </IonItem>
        </IonCard>
    )
};
