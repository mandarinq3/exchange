import { useEffect } from 'react';
import './App.scss';
import Header from './components/Header';
import Main from './components/Main';
import {connect} from 'react-redux';

function App(props) {
  useEffect(()=>{
    if(props.rates===null){
        let myHeaders = new Headers();
        myHeaders.append("apikey", "iGiztYWrMCToyd7y7XEFnyZPVKGAqbR6");

        let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
        };

        fetch("https://api.apilayer.com/fixer/latest?symbols=EUR,USD,UAH&base=UAH", requestOptions)
        .then(response => response.json())
        .then((result) => {
        props.dispatch({
        type:'GOT_RATES',
        rates:result.rates
        })
        })
        .catch(error => console.log('error', error));
    }
  });


  return (
    <div className="App">
      <Header/>
      <Main/>
    </div>
  );
  }
  

function mapStateToProps(state){
  return {
    rates:state.rates,
  }
}

export default connect(mapStateToProps)(App)
