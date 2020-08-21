const defState = {
  data: 'yes'
}

export default (state=defState, {type, payload}) => {

  switch(type) {
    case 'INIT': 
    return (() => {
      return state
    })
    default: 
    return state
  }
}