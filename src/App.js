import { useEffect } from 'react';
import './App.scss';
import Header from './components/Header';
import Main from './components/Main';
import {connect} from 'react-redux';

function App(props) {
  // useEffect(()=>{
  //   if(props.rates===null){
  //       fetch("https://api.fastforex.io//fetch-multi?from=UAH&to=EUR,USD,UAH&api_key=489d29ef3e-0d1c851dc4-rf4e9m")
  //       .then(response => response.json())
  //       .then((result) => {
  //       console.log(result.results);
  //       props.dispatch({
  //       type:'GOT_RATES',
  //       rates:result.results
  //       })
  //       })
  //       .catch(error => console.log('error', error));
  //   }
  // });


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
