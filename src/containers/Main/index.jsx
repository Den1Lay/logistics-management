import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'


import {Table, ActionsPart} from '@/containers'

import './Main.scss'

const Main = ({}) => {

  useEffect(() => {

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

export default connect(()=>({}), {})(Main);