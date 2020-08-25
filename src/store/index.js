// Стандартный подъем redux стора с одним редюсером и thunk мидлом

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import mainReducer from './reducer'

import {axios} from '@/core'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)))

// Здесь осуществляется перехват событий которые связаны с изменением данных
// Все подобные события имеют приставку в ключе v,
// Приставка "s" говорит о том, что были изменены записи. Следовательно необходимо
// отправить на сервер новые данные для их последующего сохранения.
// Приставка "c" сигнализирует о модификации перевозчиков.

let checkV = null;
store.subscribe(() => {

  let {v, data, carriers} = store.getState();

  // Все новые приставки проверяются, для того что бы исключить 
  // повторные запросы.

  if(checkV !== v) {  
    checkV = v;
    switch(v[0]) {
      case 's': // save data on server
      axios.post('/notes', {notes: data}).then(() => {
        console.log('Success update notes')
      }).catch(er => console.log('%c%s', 'color: red; font-size: 22px;', 'POST_NOTES_ERR:', er))
      break;
      case 'c': // save carriers
      axios.post('/carriers', {carriers}).then(() => {
        console.log('Success update carriers')
      }).catch(er => console.log('%c%s', 'color: red; font-size: 22px;', 'POST_CARRIERS_ERR:', er))
      break;
    }
  }

})


export default store