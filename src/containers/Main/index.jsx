

import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {DatePicker, Input, Button} from 'antd'
import {TextReducer} from '@/components'
import {Table} from '@/containers'

import './Main.scss'

const {RangePicker} = DatePicker;

const Main = ({state}) => {
  const [text, setText] = useState('realbiglorem realbiglore mrealbiglor evtextData.payloadmrealbiglore mjgjjdf')


  useEffect(() => {
    console.log('DATA:', state)
  });

  // function rangePickHandler(vals) {
  //   console.log('VALS:', vals)
  // }
  console.log('TEXT:',text)
  return (
    <div className='main'>
      <div className='main__top'>

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

export default connect((state)=>({state}), {})(Main);