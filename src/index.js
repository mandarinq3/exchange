import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducer from '../src/redux/reducer';

const store = createStore(reducer,{
    rates:null,
    payCurrency:'UAH',
    getCurrency:'USD',
    roundResult:(n)=>{
        n+='';
        let b=n.split('.');
        if(b.length>1){
            let rightPart=b[1][0]+b[1][1]+b[1][2];
            let result=+`${b[0]}.${rightPart}`;
            return result
        }else{
            return +n;
        }
    }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
    
);

