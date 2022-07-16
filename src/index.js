import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducer from '../src/redux/reducer';

const store = createStore(reducer,{
    rates:{EUR: 0.03341, USD: 0.03372, UAH: 1},
    payCurrency:'UAH',
    getCurrency:'USD',
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
    
);

