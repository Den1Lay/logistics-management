// Таблица на флексах.
import React from 'react'
import {connect} from 'react-redux'

import {TableLine, HeadPart} from '@/containers'
import {Empty} from 'antd'

import './Table.scss';

const Table = ({showData}) => {
  return (
    <div className='table'>
      <div className='table__head'>
        <HeadPart />
      </div>
      <div className='table__main'>
        <div className='table__main_wrapper'>
          {showData.map((dataObj) => <TableLine data={dataObj} />)}
          {!showData.length && <div className='plug'><Empty description={'Пора добавить несколько заявок?'} /></div>}
        </div>
      </div>
    </div>
  )
}

export default connect(({showData}) => ({showData}))(Table)