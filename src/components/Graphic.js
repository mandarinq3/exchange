import './graphic.scss';
import {connect} from 'react-redux';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'




function Graphic(props) {

const [month, setMonth] = useState(null);
const [dates, setDates] = useState([]);
let eur=[];
let usd=[];

function appendGraphic(id,rates){
    let cnv=document.querySelector(`#${id}`);
    let ctx = cnv.getContext("2d");
    let step=0;
    
    let dailyPoints=[];
    
    //по отношению к первому дню
    function foo(){
    let base=rates[0];//90
    
    rates.forEach((num)=>{
        let difference = num - base
        let a = base-difference;
        dailyPoints.push(a*10000-250)
    })
    }
    foo();
    ctx.moveTo(0, dailyPoints[0]);
    function draw(step,point){
    ctx.lineTo(step,point);
    ctx.strokeStyle = "rgb(255, 208, 0)";
    ctx.stroke();
    }
    dailyPoints.forEach((point)=>{
    draw(step,point);
    step+=20
    }) 
}

function createDatesArr(str){
    let a=str.split('');
    let b=[];
    b.push(a[a.length-2]);
    b.push(a[a.length-1]);
    return b.join('')
}


let dateLines=dates.map((date,i)=>{
    return <div key={nanoid()} className='datesLine' style={{left:`${i*10*2}px`}}><span>{date}</span></div>
});


useEffect(()=>{
    let months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    let currentMonthIndex=new Date();
    setMonth(months[currentMonthIndex.getMonth()]);

fetch('https://exchange-bae31-default-rtdb.europe-west1.firebasedatabase.app/currencyrates.json')
.then((res)=>{return res.json()})
.then((data)=>{
    for(let k in data){
        eur.push(data[k].rates.EUR)
        usd.push(data[k].rates.USD)
        dates.push(createDatesArr(data[k].id))
    }   
})
.then(()=>{
        appendGraphic('eur',eur)
        appendGraphic('usd',usd)
})
.catch((error)=>{console.log('error:', error)})
})
    
{/* ============================================================================================             */}
  return (
    <section className="graphics-section">
        <span>
            <h3>{props.pair}</h3>
            <span>{month}</span>
        </span>
        <canvas id={props.canvasId}></canvas>
        {dateLines}
    </section>
  );
}
{/* ============================================================================================             */}

function mapStateToProps(state){
    return {
        rates:state.rates,
    }
 }

export default connect(mapStateToProps)(Graphic);