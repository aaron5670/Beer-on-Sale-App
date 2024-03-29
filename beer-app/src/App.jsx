import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {beerOutline, personCircle} from 'ionicons/icons';
import Home from './pages/home/Home';
import Camera from './pages/camera/Camera';
import Account from './pages/account/Account';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/aanbiedingen" component={Home} exact={true}/>
                    <Route path="/tab2" component={Camera} exact={true}/>
                    <Route path="/tab3" component={Account}/>
                    <Route path="/" render={() => <Redirect to="/aanbiedingen"/>} exact={true}/>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="aanbiedingen" href="/aanbiedingen">
                        <IonIcon icon={beerOutline}/>
                        <IonLabel>Aanbiedingen</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tab3" disabled>
                        <IonIcon icon={personCircle}/>
                        <IonLabel>Account</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
