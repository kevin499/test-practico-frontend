import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import busquedaReducer from './busqueda/reducer'
import uiReducer from './ui/reducer'

const reducer = combineReducers({
    busqueda: busquedaReducer, 
    ui: uiReducer
})

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
let store = createStoreWithMiddleware(reducer);

export default store