import './main.scss';
import { Container,Row,Form,Spinner } from 'react-bootstrap';
import { useRef, useState } from 'react';
import {connect} from 'react-redux';
import Loader from './Loader';



function Main(props) {
    let initialState={
        payCurrency:props.payCurrency,
        getCurrency:props.getCurrency
    }
    const [payInpVal, setPayInpVal] = useState();
    const [getInpVal, setGetInpVal] = useState();

    let payInputRef=useRef(null);
    let getInputRef=useRef(null);
    let paySelectRef=useRef(null);
    let getSelectRef=useRef(null);

function roundResult(n){
    console.log('n',n)
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

function payInpHandler(){
    setPayInpVal(payInputRef.current.value);
    let val=payInputRef.current.value/props.rates[`${props.payCurrency}`]*props.rates[`${props.getCurrency}`];
    setGetInpVal(roundResult(val));
}

function getInpHandler(){
    setGetInpVal(getInputRef.current.value);
    let val=getInputRef.current.value*props.rates[`${props.payCurrency}`]/props.rates[`${props.getCurrency}`];
    setPayInpVal(roundResult(val));

}


function paySelectHandler(){
    let flag=document.querySelector('.currency-flag--pay');
    flag.setAttribute('src',`../assets/${paySelectRef.current.value}.png`);
    payInputRef.current.setAttribute('placeholder', paySelectRef.current.value);
    props.dispatch({
        type:'CHANGED_PAY_CURRENCY',
        payCurrency:paySelectRef.current.value,
    })
    setPayInpVal('')
    payInputRef.current.focus();


}

function getSelectHandler(){
    let flag=document.querySelector('.currency-flag--get');
    flag.setAttribute('src',`../assets/${getSelectRef.current.value}.png`);
    getInputRef.current.setAttribute('placeholder', getSelectRef.current.value);  
    props.dispatch({
        type:'CHANGED_GET_CURRENCY',
        getCurrency:getSelectRef.current.value,
    })
    if(payInputRef.current.value!=''){
        let val=payInputRef.current.value/props.rates[`${props.payCurrency}`]*props.rates[`${getSelectRef.current.value}`];
        setGetInpVal(roundResult(val));
    }else{
        setGetInpVal('')
        getInputRef.current.focus();
    }
    
}


let isSwaped=false;
let payFormRef=useRef(null);
let getFormRef=useRef(null);

function swapForms(){
    
    if(isSwaped){
        payFormRef.current.style.top='200px'
        getFormRef.current.style.top='335px'
    }else{
        payFormRef.current.style.top='335px'
        getFormRef.current.style.top='200px'
    }
    isSwaped=!isSwaped
    
}


  

  return (
    <main className="main">  
        <Container>
            <Row className='main-row'>
                <h2 className='main-row__title--pay'>PAY</h2>
                {props.rates===null ? <Loader/> :
                <Form className='pay-form' ref={payFormRef}>
                <fieldset className='form-fieldset '>
                    <Form.Group>
                        <Form.Label htmlFor="payCurrencySel" className='currency-label'>
                        <img className='main-currency-flag currency-flag--pay' src={`../assets/UAH.png`} alt=''/>
                            <Form.Select 
                            ref={paySelectRef} 
                            id="payCurrencySel" 
                            onChange={()=>{
                                paySelectHandler()
                            }}>
                                <option value='UAH'>UAH</option>
                                <option value='USD'>USD</option>
                                <option value='EUR'>EUR</option>
                            </Form.Select>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="payInp" className='input-label'>
                            <Form.Control ref={payInputRef} id='payInp' placeholder='UAH' onChange={(e)=>{
                                payInpHandler(e);
                            }}  value={payInpVal}/>
                        </Form.Label>
                    </Form.Group>
                </fieldset>
                </Form>
}
            </Row>
            <div className='swap-btn'>
            {props.rates===null ? <h3>loading...</h3> :
                <img 
                onClick={()=>{
                swapForms();
                }} 
                className='main-currency-flag currency-flag--pay' 
                src={`../assets/circle.png`} 
                alt=''
                />
            }
            </div>
            {/* =============================================================== */}
            <Row className='main-row'>
            <h2 className='main-row__title--get'>GET</h2>
            {props.rates===null ? <Loader/> :
            <Form className='get-form' ref={getFormRef}>
                    <fieldset className='form-fieldset '>
                        <Form.Group>
                            <Form.Label htmlFor="getCurrencySel" className='currency-label'>
                            <img className='main-currency-flag currency-flag--get' src={`../assets/USD.png`} alt=''/>
                                <Form.Select 
                                ref={getSelectRef} 
                                id="getCurrencySel" 
                                onChange={()=>{
                                    getSelectHandler()
                                }}>
                                    <option value='USD'>USD</option>
                                    <option value='UAH'>UAH</option>
                                    <option value='EUR'>EUR</option>
                                </Form.Select>
                             </Form.Label>
                        </Form.Group>
                    
                        <Form.Group >
                            <Form.Label htmlFor="getInp" className='input-label'>
                                <Form.Control ref={getInputRef} onChange={()=>{
                                    getInpHandler();
                                }}  id='getInp' placeholder='USD' value={getInpVal} />
                            </Form.Label>
                        </Form.Group>

                        
                    </fieldset>
                </Form>
}
            </Row>
        </Container>
    </main>
  );
}

 function mapStateToProps(state){
    return {
        rates:state.rates,
        payCurrency:state.payCurrency,
        getCurrency:state.getCurrency,
    }
 }
export default connect(mapStateToProps)(Main);