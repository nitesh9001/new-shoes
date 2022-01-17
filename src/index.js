import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routers from './Routers';
import {store, persistor}  from "./redux/store";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import Spinner from './Spinner';

ReactDOM.render(
    <Provider store={store}>
       <PersistGate loading={<Spinner />} persistor={persistor}>
        <Routers />
       </PersistGate>
    </Provider>,
  document.getElementById('root')
);

