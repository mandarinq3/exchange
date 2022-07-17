import './main.scss';
import { Container,Row,Form} from 'react-bootstrap';
import { useRef, useState } from 'react';
import {connect} from 'react-redux';
import Loader from './Loader';



function Main(props) {

    const [payInpVal, setPayInpVal] = useState('');
    const [getInpVal, setGetInpVal] = useState('');

//====================inputs ref====================
    let payInputRef=useRef(null);
    let getInputRef=useRef(null);
    let paySelectRef=useRef(null);
    let getSelectRef=useRef(null);

//====================FORMS REF====================
    let isSwaped=false;
    let payFormRef=useRef(null);
    let getFormRef=useRef(null);
//========================================
    let clearBtns=document.querySelectorAll('.clear-btn');

    function showClearBtns(shouldShow){
        clearBtns.forEach((btn)=>{
            if(shouldShow==true){
                btn.classList.add('clear-btn--show');
            }else{
                btn.classList.remove('clear-btn--show');
            }
            
        })
    }
//========================================
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

//========================================
function clearInput(e){
    e.preventDefault();
    showClearBtns(false);
    let targetInput = document.querySelector(`#${e.currentTarget.dataset.id}`);
    if(targetInput.value==''){
        targetInput.focus();
    }else{
        setPayInpVal('');
        setGetInpVal('');
        targetInput.focus();
    }
}
//========================================
function convert(amount, payWith, getTo){
    return amount/payWith*getTo
}

//==================== INPUT HANDLERS ====================
function payInputHandler(){
    setPayInpVal(payInputRef.current.value);//print 
    showClearBtns(true);
    
    let amount = payInputRef.current.value;
    let payWith = props.rates[`${props.payCurrency}`];
    let getWith = props.rates[`${props.getCurrency}`];
    
    let result=convert(amount, payWith, getWith);

    setGetInpVal(result);

    if(amount===''){
        setGetInpVal('');
        showClearBtns(false);
    }
    
}

function getInputHandler(){
    setGetInpVal(getInputRef.current.value);//print
    showClearBtns(true);//show or hide

    let amount = getInputRef.current.value;
    let payWith = props.rates[`${props.getCurrency}`];
    let getWith = props.rates[`${props.payCurrency}`];

    let result=convert(amount, payWith, getWith);

    setPayInpVal(result);

    if(amount===''){
        setPayInpVal('');
        showClearBtns(false);
    }
}

//==================== SELECT HANDLER ====================

//------------------pushing arguments  
// for (currencyFlagType) -- 'pay' or 'get'
// for (selectVal) -- paySelectRef.current.value or getSelectRef.current.value
// for (inputRef) -- payInputRef or getInputRef

function selectHandler(currencyFlagType, selectVal, inputRef){
    let flag=document.querySelector(`.currency-flag--${currencyFlagType}`);//gets img tag
    flag.setAttribute('src',`../assets/${selectVal}.png`);// sets src of img tag
    inputRef.current.setAttribute('placeholder', selectVal);// chngs plchldr into picked curency.

    if(currencyFlagType==='pay'){
        props.dispatch({
            type:'CHANGED_PAY_CURRENCY',
            payCurrency:selectVal,
        })
    }else{
        props.dispatch({
            type:'CHANGED_GET_CURRENCY',
            getCurrency:selectVal,
        })
    }
}

  return (
    <main className="main">  
        <Container>
{/* ============================================================================================================================  */}
            <Row className='main-row'>
                <h2 className='main-row__title--pay'>PAY</h2>
                {props.rates===null ? <Loader/> :
                <Form className='pay-form' ref={payFormRef}>
                <fieldset 
                className='form-fieldset '
                onFocus={(e)=>{
                    e.currentTarget.style.border=' 2px solid rgb(255, 208, 0)';
                }}
                onBlur={(e)=>{
                    e.currentTarget.style.border=' 0px solid red';
                }}
                >
{/* ================================    SELECT       =====================================================================*/}
                    <Form.Group>
                        <Form.Label htmlFor="payCurrencySel" className='currency-label'>
                        <img className='main-currency-flag currency-flag--pay' src={`../assets/UAH.png`} alt=''/>
                            <Form.Select 
                            ref={paySelectRef} 
                            id="payCurrencySel" 
                            onChange={()=>{
                                selectHandler('pay', paySelectRef.current.value, payInputRef);
                                    if(getInputRef.current.value===''){
                                        payInputRef.current.focus();
                                    }
                                    else{
                                        let amount = getInputRef.current.value;
                                        let payWith = props.rates[`${props.getCurrency}`];
                                        let getWith = props.rates[`${paySelectRef.current.value}`];
                                    
                                        let result=convert(amount, payWith, getWith);
                                    
                                        setPayInpVal(result);
                                    } 
                            }}>
                                <option value='UAH'>UAH</option>
                                <option value='USD'>USD</option>
                                <option value='EUR'>EUR</option>
                            </Form.Select>
                        </Form.Label>
                    </Form.Group>
{/*================================    PAY INPUT */}
                    <Form.Group >
                        <Form.Label htmlFor="payInp" className='input-label'>
                            <Form.Control 
                            type='number' 
                            ref={payInputRef} 
                            id='payInp' 
                            placeholder='UAH'
                            value={payInpVal} 
                            onChange={(e)=>{
                                payInputHandler(e);
                            }}/>
                            
                        </Form.Label>
                    </Form.Group>
                    
{/*==============================*/}
                </fieldset>
                <button 
                className='clear-btn' 
                data-id='payInp'
                onClick={(e)=>{
                    clearInput(e);
                }}
                >
                    clear
                </button>
                </Form>
}
            </Row>
{/* =============================  */}
            <div className='swap-btn'>
                {props.rates===null ? <h3>loading...</h3> :
                <img 
                className='main-currency-flag currency-flag--pay' 
                src={`../assets/circle.png`} 
                alt='switch button img'
                onClick={()=>{
                    swapForms();
                }} 
                />
            }
            </div>
{/* ==================================================  */}
            <Row className='main-row'>
            <h2 className='main-row__title--get'>GET</h2>
            {props.rates===null ? <Loader/> :
            <Form className='get-form' ref={getFormRef}>
                    <fieldset 
                    className='form-fieldset' 
                    onFocus={(e)=>{
                        e.currentTarget.style.border=' 2px solid rgba(33,163,255,1)';
                    }}
                    onBlur={(e)=>{
                        e.currentTarget.style.border=' 0px solid red';
                    }}
                    >
{/* ================================    SELECT       ====================*/}
                        <Form.Group>
                            <Form.Label htmlFor="getCurrencySel" className='currency-label'>
                            <img className='main-currency-flag currency-flag--get' src={`../assets/USD.png`} alt=''/>
                                <Form.Select 
                                ref={getSelectRef} 
                                id="getCurrencySel" 
                                onChange={()=>{
                                    selectHandler('get', getSelectRef.current.value, getInputRef)
                                    if(payInputRef.current.value===''){
                                        getInputRef.current.focus();
                                    }
                                    else{
                                        let amount = payInputRef.current.value;
                                        let payWith = props.rates[`${props.payCurrency}`];
                                        let getWith = props.rates[`${getSelectRef.current.value}`];
                                        let result=convert(amount, payWith, getWith);   
                                        setGetInpVal(result);
                                        
                                    }
                                }}>
                                    <option value='USD'>USD</option>
                                    <option value='UAH'>UAH</option>
                                    <option value='EUR'>EUR</option>
                                </Form.Select>
                             </Form.Label>
                        </Form.Group>
{/* ================================    GET INPUT ============            */}
                        <Form.Group >
                            <Form.Label htmlFor="getInp" className='input-label'>
                                <Form.Control 
                                type='number' 
                                ref={getInputRef} 
                                id='getInp' 
                                placeholder='USD' 
                                value={getInpVal} 
                                onChange={()=>{
                                    getInputHandler();
                                }}
                                />
                            </Form.Label>
                        </Form.Group>
{/* ===========================================================================             */}
                        
                    </fieldset>
                    <button 
                    className='clear-btn' 
                    data-id='getInp'
                    onClick={(e)=>{
                        clearInput(e);
                    }}
                    >
                    clear
                </button>
                </Form>
}
            </Row>
        </Container>
    </main>
  );
}

{/* ==========================================  END  ===========================             */}
 function mapStateToProps(state){
    return {
        rates:state.rates,
        payCurrency:state.payCurrency,
        getCurrency:state.getCurrency,
    }
 }
export default connect(mapStateToProps)(Main);