import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {DatePicker} from 'antd'

import './Main.scss'

const {RangePicker} = DatePicker;

const Main = ({state}) => {
  useEffect(() => {
    console.log('DATA:', state)
  });

  function rangePickHandler(vals) {
    console.log('VALS:', vals)
  }

  return (
    <div className='main'>
      <RangePicker onChange={rangePickHandler} showTime />
    </div>
  )
}

export default connect((state)=>({state}), {})(Main);