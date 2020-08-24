import {axios} from '@/core';

export const fetchData = () => dispatch => {
  axios.get('/data').then(({data}) => {
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  })
  .catch(er => console.log('%c%s', 'color: red; font-size: 22px;', 'ERR_FETCH_DATA:', er))

}