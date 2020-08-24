// data не модифицируется
import {createFilter, mineInd} from '@/utils'
const dataPass = [
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
  }
]

const defState = {
  data: dataPass,
  showData:dataPass,
  carriers,

  reverse: false, // data for filters
  reverseType: 'number',
  searchType: null,
  searchData: null,
  onliNotAssigned: false,
}

export default (state=defState, {type, payload}) => {

  const getShowData = createFilter({...state, data: state.data.slice()})
  switch(type) {
    case 'INIT': 
    return (() => {
      return {
        ...state
      };
    })
    case 'SET_POLARITY_FILTER': // payload === 'comment' | 'name' | 'date'
    return (() => {

      return {
        ...state,
        reverse: !state.reverse,
        reverseType: payload
      };
    })()
    case 'SET_SEARCH_TYPE': // payload === 'comment' | 'name' | 'date'
    return (() => {
      //state.searchType = payload;
      return { 
        ...state, 
        searchType: payload,
        searchData: null,
        showData: getShowData({searchType: payload, searchData: null})
      };
    })();
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
        v: Math.random()
      }
    })()
    case 'DELETE_NOTE':
    return (() => {

      return {
        ...state
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
          v: 's'+Math.random()
        }
      })()
    // case 'SET_SEARCH_STATUS':
    // return (() => {
    //   state.search = '';
    //   return state
    // })
    default: 
    return state
  }
}