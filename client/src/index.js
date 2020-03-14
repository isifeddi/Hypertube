import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'

import configureStore, { history } from './store'
import { ConnectedRouter } from 'connected-react-router';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";

const store = configureStore();
const persistor = persistStore(store);

document.head.appendChild(styleLink);
ReactDOM.render(

    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <App store={store} />
            </ConnectedRouter>
        </PersistGate>
    </Provider>

    , document.getElementById('root'));
serviceWorker.unregister();