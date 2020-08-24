import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {Table, ActionsPart} from '@/containers'

import {fetchData} from '@/actions'

import './Main.scss'

const Main = ({refreshed,  fetchData}) => {

  useEffect(() => {
    debugger
    !refreshed && fetchData()
  });

  // function rangePickHandler(vals) {
  //   console.log('VALS:', vals)
  // }
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
      <a target='_blank' href={window.location.origin+'/public/about.pdf'} className='main__docs'>
        Документация
      </a>
      {/* <RangePicker 
        onChange={rangePickHandler} 
        showTime={{ format: 'HH:mm' }} 
        format="YYYY-MM-DD HH:mm"
        />
        <Input onBlur={() => console.log('BLURR_EV')} />
      <div style={{marginLeft: '30px', width: '20vw', height: '5vh', border: '1px solid grey'}}>
        <TextReducer text={text} />
      </div>
      <Button type='primary' onClick={() => setText('NEWNEWNWENEWN')}>CHOOSE DATA</Button> */}
    </div>
  )
}

export default connect(({refreshed})=>({refreshed}), {fetchData})(Main);