export default function reducer(state, action){
    if(action.type==='GOT_RATES'){
        return {
            ...state,
                rates:action.rates,
        }
    }else if(action.type==='CHANGED_PAY_CURRENCY'){
        return {
            ...state,
            payCurrency:action.payCurrency,
        }
    }else if(action.type==='CHANGED_GET_CURRENCY'){
        return {
            ...state,
            getCurrency:action.getCurrency,
        }
    }
    return state;
} 