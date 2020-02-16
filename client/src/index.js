import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux'

import configureStore, {history} from './store'
import { ConnectedRouter } from 'connected-react-router';
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/lib/integration/react";

const  store = configureStore();
const persistor = persistStore(store);
ReactDOM.render(


<Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
            <App store={store}/>
        </ConnectedRouter>
    </PersistGate>
</Provider>

, document.getElementById('root'));
serviceWorker.unregister();