import { createStore, applyMiddleware } from 'redux'
import busqueda from './busqueda/reducer'
import thunk from 'redux-thunk';

// const store = createStore(busqueda)
const store = createStore(busqueda, applyMiddleware(thunk));
// const store = createStore(
//     busqueda, /* preloadedState, */
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );

export default store