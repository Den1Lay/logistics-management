// быстрый чек на ререндор и дальнейшее планирование от него
import React from 'react'
import {connect} from 'react-redux'

import {TableLine, HeadPart} from '@/containers'
import {Empty} from 'antd'
// фильтры 
import './Table.scss';

const Table = ({showData}) => {
  return (
    <div className='table'>
      <div className='table__head'>
        <HeadPart />
      </div>
      <div className='table__main'>
        <div className='table__main_wrapper'>
          {showData.map((dataObj) => <TableLine data={dataObj}  />)}
          {!showData.length && <div className='plug'><Empty description={'Пора добавить несколько заявок?'} /></div>}
        </div>
      </div>
    </div>
  )
}

export default connect(({showData, v}) => ({showData, v}))(Table)