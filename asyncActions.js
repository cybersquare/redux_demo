const redux = require("redux")
// Thunk middleware adds capacity to return a function instead of an object
const thunkMiddleware = require("redux-thunk").default
const axios = require("axios")

const createStore = redux.legacy_createStore  
const applyMiddleware = redux.applyMiddleware

const initialSate = {
    loading: false,
    users: [],
    error: "",
}

// Actions
const FETCH_USERS_REQURESTED = "FETCH_USERS_REQURESTED"
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED"
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED"

const fetchUsersRequest = ()=>{
    return{
        type: FETCH_USERS_REQURESTED,
    }
}

// Action creators
const fetchUsersSuccess = (users)=>{
    return{
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fetchUsersFailure = (error)=>{
    return{
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

// Reducers
const reducer = (state=initialSate, action)=>{
    switch(action.type){
        case FETCH_USERS_REQURESTED:
            return{
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCEEDED:
            return{
                loading: false,
                users: action.payload,
                errro: "",
            }      
        case FETCH_USERS_FAILED:
            return{
                loading: false,
                users: [],
                errro: action.payload,
            }   
    }
}

// Action creator
const fetchUsers = ()=>{
    return function(dispatch){ // We can return function with the help of thunk middleware
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users").then((response)=>{
            // response.data is the users
            const users = response.data.map((user)=>user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch((error)=>{
            //error.message is the error message
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(()=>{
    console.log(store.getState())
    console.log("subscribed")
})

store.dispatch(fetchUsers())