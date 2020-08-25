// Приложение работает вокруг трек основных массивов. Это "data" - массив с заявками,  
// "carriers" - массив с перевозчиками и "showData" - массив с данными, которые будут демострироваться юзеру.
// В объектах data хранится номер, время получения, объект с данными фирмы, комментарий и id назначенного
// исполнителя заявки. 
// В объектах carriers хранятся данные исполнителя. Связь между массивами выстраивается через id. 
// Все действия, которые происходят в редюсере направлены на модифирование этих трех массивов.

import {createFilter, mineInd} from '@/utils'
import {v4} from 'uuid'
const dataPass = [ // они здесь для большей наглядности структуры данных
  {
    number: '123',
    receiveTime: 'Sun Aug 23 2020 02:46:54 GMT+0500 (Екатеринбург, стандартное время)',
    firm: {
      name: 'Eze_transport',
      phone: '911'
    },
    comment: {
      short: 'sandToBitch',
      big: 'Man make big sand castle'
    },
    carrier: 'uuid'
  }
]

const carriers = [
  {
    id: 'uuid',
    firstName: 'Bob',
    secondName: 'Brando',
    lastName: 'Rock',
    phone: '777',
    atl: '99999'
  },
  {
    id: 'uuid2',
    firstName: 'Nill',
    secondName: 'Cuper',
    lastName: 'Rock',
    phone: '777',
    atl: '99999'
  },
  {
    id: 'uuid3',
    firstName: 'Mark',
    secondName: 'Dillian',
    lastName: 'Rock',
    phone: '777',
    atl: '99999'
  }
]

// Так же ключевым элементом являются данные о фильтрах, которые напрямую участвуют в создании 
// showData. Грубо говоря фильтры работают все время. Изменяются только их параметры.

// Ключ v отвечает за "ручное" обновление компонентов. (см комментарии в containers/TableLine/index.jsx)
// А также сигнализирует о том, какое действие только что произошло для его перехвата и дальнейших действий (см ком. в store/index.js)

const defState = {
  data: [],
  showData:[],
  carriers: [],
  refreshed: false,
  v: 'init',

  reverse: false, // data for filters
  reverseType: 'number',
  searchType: null,
  searchData: null,
  onliNotAssigned: false,
}

export default (state=defState, {type, payload}) => {

  const getShowData = createFilter({...state, data: state.data.slice()})
  // съедает все данные о включенных фильтрах, а также в последующем модифируется 
  // более свежими версиями ключей

  switch(type) {
    case 'SET_DATA': // payload === {notes, carriers}
    return (() => {
      const {notes, carriers} = payload;

      return {
        ...state,
          data: notes,
          carriers,
          showData: getShowData({data: notes, carriers})
      };
    })()
    case 'SET_POLARITY_FILTER': // payload === 'comment' | 'name' | 'date'
    return {
      ...state,
      reverse: !state.reverse,
      reverseType: payload,
      showData: getShowData({reverseType: payload, reverse: !state.reverse})
    };
    case 'SET_SEARCH_TYPE': // payload === 'comment' | 'name' | 'date'
    return { 
      ...state, 
      searchType: payload,
      searchData: null,
      showData: getShowData({searchType: payload, searchData: null})
    };
    case 'SET_ASSIGNED_FILTER':
    return {
      ...state,
      onliNotAssigned: !state.onliNotAssigned,
      showData: getShowData({onliNotAssigned: !state.onliNotAssigned})
    }
    case 'SET_SEARCH_DATA': // payload === 'string' | [date1, date2]
    return { 
      ...state,
      searchData: payload,
      showData: getShowData({searchData: payload})
    }
    case 'NEW_NOTE': 
    return (() => {
      const maxNumb = state.data.slice().reduce((res, {number}) => +number>res ? +number : res, 0);
      const newNote = {
        number: maxNumb+1+'',
        receiveTime: new Date(),
        firm: null,
        comment: null,
        carrier: null
      };
      const data = [newNote, ...state.data]
      return {
        ...state,
        showData: getShowData({data: data.slice()}),
        data,
        v: 's'+Math.random()
      }
    })()
    case 'DELETE_NOTE': // payload === number
    return (() => {
      let noteInd = [];
      mineInd(state.data, payload, 'number', noteInd);
      state.data.splice(noteInd[0], 1);
      return {
        ...state,
        showData: getShowData({data: state.data.slice()}),
        v: 's'+Math.random()
      }
    })();
    case 'SAVE': // payload {address, newData, field}
    return (() => {
      const {newData, address, field} = payload;
      let noteInd = [];
      mineInd(state.data, address, 'number', noteInd);
      if(field === 'carrier') {
        let carrierInd = [];
        mineInd(state.carriers, state.data[noteInd[0]].carrier, 'id', carrierInd);
        state.carriers[carrierInd[0]] = newData;
        
        state.v = 'c'+Math.random();
      } else { // comment, firm 
        state.data[noteInd[0]][field] = newData;
        
        state.v = 's'+Math.random();
      }
      
      return {
        ...state,
        showData: getShowData({data: state.data.slice(), carriers: state.carriers}),
        lastAddress: address,
        
      }
    })();
    case 'SET_CARRIER': // payload === {address, pass} -> pass === id
      return (() => {
        const {address, pass} = payload
        let noteInd = [];
        mineInd(state.data, address, 'number', noteInd);
        state.data[noteInd[0]].carrier = pass;

        return {
          ...state,
          showData: getShowData({data: state.data}),
          v: 's'+Math.random()
        }
      })();
    case 'NEW_CARRIER': // payload === newCarrier {firstName, secondName, ...}
      payload.id = 'c'+v4()
      return {
        ...state,
        carriers: [payload, ...state.carriers],
        v: 'c'+Math.random()
      }
    default: 
    return state
  }
}