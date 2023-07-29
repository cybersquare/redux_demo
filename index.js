// import redux from 'redux';

const redux = require('redux')

const createStore = redux.legacy_createStore
const bindActionCreators = redux.bindActionCreators

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"

function orderCake(){ //Action creator is a function that returns action object
    return{ // An action is a JS object with type property
        type : CAKE_ORDERED,
        quantity : 1,
    }
}

function restockCake(qty=1){
    return{
        type: CAKE_RESTOCKED,
        quantity: qty,
    }
}


const initialSate = {
    numberOfCakes: 10,
    anotherPorperty: 0,
}

// (previosState, action) = newState

const reducer = (state=initialSate, action)=>{
    switch (action.type) {
        case CAKE_ORDERED:
            return{
                ...state,
                numberOfCakes: state.numberOfCakes - 1,
            }
            break;

        case CAKE_RESTOCKED:
            return{
                ...state,
                numberOfCakes: state.numberOfCakes + action.quantity,
            }
            break;
    
        default:
            return state
            break;
    }

}



const store = createStore(reducer)
console.log("Initial state", store.getState())

const unsubscribe = store.subscribe(()=>console.log("Updated state", store.getState())) //listener

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const action = bindActionCreators({orderCake, restockCake}, store.dispatch)
action.orderCake()
action.orderCake()
action.restockCake()


unsubscribe()

store.dispatch(orderCake())
store.dispatch(orderCake())

