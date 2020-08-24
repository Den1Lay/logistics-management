export const initData = payload => ({
  type:'INIT',
  payload
})
export const setPolarFilter = payload => ({
  type: 'SET_POLARITY_FILTER',
  payload
})
export const setSearchType = payload => ({
  type: 'SET_SEARCH_TYPE',
  payload
})
export const setSearchData = payload => ({
  type: 'SET_SEARCH_DATA',
  payload
})
export const setAssignFilter = () => ({
  type: 'SET_ASSIGNED_FILTER'
})
export const newNote = () => ({
  type: 'NEW_NOTE'
})
export const save = payload => ({
  type: 'SAVE',
  payload
})
export const setCarrier = payload => ({
  type: 'SET_CARRIER',
  payload
})
export const newCarrier = payload => ({
  type: 'NEW_CARRIER',
  payload
})
export const deleteNote = payload => ({
  type: 'DELETE_NOTE',
  payload
})