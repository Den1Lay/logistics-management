// Здесь собираются все главные контейнеры
import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {Table, ActionsPart} from '@/containers'

import {fetchData} from '@/actions'

import './Main.scss'

const Main = ({refreshed,  fetchData}) => {

  useEffect(() => {
    !refreshed && fetchData()
  });

  return (
    <div className='main'>
      <div className='main__top'>
        <div className='main__top_space'>
        </div>
        <div className='main__top_actions'>
          <ActionsPart />
        </div>
      </div>
      <div className='main__table'>
        <Table />
      </div>
      <div className='main__docs'>
        <a target='_blank' href={window.location.origin+'/public/about.pdf'} >
          Документация
        </a>
        <a target='_blank' href={window.location.origin+'/public/test.pdf'} >
          Задание
        </a>
      </div>
    </div>
  )
}

export default connect(({refreshed})=>({refreshed}), {fetchData})(Main);