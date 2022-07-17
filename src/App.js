import { useEffect } from 'react';
import './App.scss';
import Header from './components/Header';
import Main from './components/Main';
import {connect} from 'react-redux';

function App(props) {

  useEffect(()=>{
  if(props.rates===null){
//=================useefect start========================
  let id = +convertDateToId(null);

//..............................................................
  function convertDateToId(arg){
      if(arg!=null){ 
        return arg.split(' ')[0].match(/\d/g, ',').join('')
      }else{
        let date = new Date().toLocaleDateString();
        let exp = new RegExp(/\./g)
        return date.replace(exp,',').split(',').reverse().join('');   
      }
  }

  function checkBase(obj,id){
      let hasData=false;
      for(let key in obj){
        hasData=obj[key].id==id;
      }  
      return hasData;
    }
//..............................................................
//......делаем запрос и получаем данные с нашей базы данных и проверяем есть ли в базе данные за сегодня.............
fetch('https://exchange-bae31-default-rtdb.europe-west1.firebasedatabase.app/currencyrates.json')
.then((res)=>{return res.json()})
.then((data)=>{
//-----------------если данные за сегодня нашлись то просто диспатчим их в store
  if(checkBase(data,id)){//true
//..........................
  for(let k in data){
//___________________________
  if(data[k].id==id){
    
          props.dispatch({
          type:'GOT_RATES',
          rates:data[k].rates
          })
  }
//___________________________
}
//..........................
//.......если все же данных нет то делаем запрос на сервер обменника и получаем котировки на сегодня.....
}else{
  //+++++++++++++++++++++++++
  fetch("https://api.fastforex.io//fetch-multi?from=UAH&to=EUR,USD,UAH&api_key=489d29ef3e-0d1c851dc4-rf4e9m")
  .then(response => response.json())
  .then((result) => {
    // 1)запускаем dispatch()
      props.dispatch({
      type:'GOT_RATES',
      rates:result.results
      })
    // 2) создаем обект для отправки и сохранения на сервере
    let dataToSave={
      id:convertDateToId(result.updated),
      rates:result.results
    }
    // 3) делаем POST запрос и сохраняем новые данные на сервер
    fetch('https://exchange-bae31-default-rtdb.europe-west1.firebasedatabase.app/currencyrates.json',
    {
      method:'POST',
      body:JSON.stringify(dataToSave),
      headers:{"Content-Type":"application/json charset=utf-8"}
    }
    )
  }).catch(error => console.log('error', error));
  //+++++++++++++++++++++++++++
}
//-----------------
}).catch(error => console.log('error', error));
//=================useefect end ====================  
  }
  })

//=========================================
  return (
    <div className="App">
      <Header/>
      <Main/>
    </div>
  );
//=========================================

}
  

function mapStateToProps(state){return {rates:state.rates,}}

export default connect(mapStateToProps)(App)