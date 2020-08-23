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
  carriers,
  reverse: false,
  reverseType: null,
  searchType: null,
  search: null,
}

export default (state=defState, {type, payload}) => {

  switch(type) {
    case 'INIT': 
    return (() => {
      return {
        ...state
      };
    })
    case 'SET_POLARITY_FILTER':
    return (() => {

      return {
        ...state,
        reverse: !state.reverse,
        reverseType: payload
      };
    })()
    case 'SET_SEARCH_TYPE': 
    return (() => {
      //state.searchType = payload;
      return {
        ...state, 
        searchType: payload
      };
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