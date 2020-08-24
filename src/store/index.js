import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import mainReducer from './reducer'

import {axios} from '@/core'
//makeMiddleware, that catch game actions and make req to server;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)))

let checkV = null;
store.subscribe(() => {

  let {v, data, carriers} = store.getState();
  debugger
  if(checkV !== v) {  
    checkV = v;
    switch(v[0]) {
      case 's': // save data on server
      axios.post('/notes', {notes: data}).then(() => {
        console.log('Success update notes')
      }).catch(er => console.log('%c%s', 'color: red; font-size: 22px;', 'POST_NOTES_ERR:', er))
      break;
      case 'c': // save creators
      axios.post('/carriers', {carriers}).then(() => {
        console.log('Success update carriers')
      }).catch(er => console.log('%c%s', 'color: red; font-size: 22px;', 'POST_CARRIERS_ERR:', er))
      break;
    }
  }

})


export default store