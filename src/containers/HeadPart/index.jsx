import React from 'react'
import {connect} from 'react-redux'

import {HeadElement} from '@/components'

import './HeadPart.scss';

const HeadPart = () => {
  return (
    <div className='headPart'>
      <div className='headPart__space'>

      </div>
      <div className='headPart__main'>
        <div className='headPart__main_numb'>
          <HeadElement text={'№ заявки'} type={'number'} />
        </div>
        <div className='headPart__main_date'>
          <HeadElement text={'Дата получения'} type={'date'} />
        </div>
        <div className='headPart__main_firm'>
          <HeadElement text={'Фирма клиента'} type={'firm'} />
        </div>
        <div className='headPart__main_comment'>
          <HeadElement text={'Комментарий'} type={'comment'} />
        </div>
        <div className='headPart__main_carrier'>
          <div style={{width: '80%'}}>
            <HeadElement text={'Перевозчик'} type={'carrier'} />
          </div>
          <div style={{width: '20%'}}></div>
        </div>
      </div>
    </div>
  )
}

export default connect(() => ({}), {})(HeadPart)