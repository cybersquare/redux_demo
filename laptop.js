// Create object of redux
const redux = require('redux')

const reduxLogger = require("redux-logger")
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware

// Create object of store
const createStore = redux.legacy_createStore

// Actions
const LAPTOP_ORDERED = "LAPTOP_ORDERED"
const LAPTOP_RESTOCKED = "LAPTOP_RESTOCKED"

// Action creator is a function that returns action object
function orderLaptop(){ 
    return{ // An action is a JS object with type property
        type : LAPTOP_ORDERED,
        quantity : 1,
    }
}

function restockLaptop(qty=1){
    return{
        type: LAPTOP_RESTOCKED,
        quantity: qty,
    }
}

// Initial state
const initialSate = {
    numberOfLaptops: 10,
    numOfSmatphones: 5,
}

// Recucers. Syntax is reducer(previosState, action)=>newState
const reducer = (state=initialSate, action)=>{
    switch (action.type) {
        case LAPTOP_ORDERED:
            return{
                ...state,
                numberOfLaptops: state.numberOfLaptops - 1,
            }
        case LAPTOP_ORDERED:
            return{
                ...state,
                numberOfLaptops: state.numberOfLaptops + action.quantity,
            }
        default:
            return state
    }
}

// Create store. Reducer by default will return current state
const store = createStore(reducer, applyMiddleware(logger))
console.log("Initial state", store.getState())

// Subscribe to store
const unsubscribe = store.subscribe(()=>console.log("Updated state", store.getState())) //listener

// Trigger actions
store.dispatch(orderLaptop())
store.dispatch(orderLaptop())
store.dispatch(orderLaptop())
store.dispatch(restockLaptop(3))

// Unsubscribe
unsubscribe()