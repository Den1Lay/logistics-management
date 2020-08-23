// быстрый чек на ререндор и дальнейшее планирование от него
import React from 'react'
import {connect} from 'react-redux'

import {TableLine, HeadPart} from '@/containers'
// фильтры 
import './Table.scss';

const Table = ({data}) => {
  return (
    <div className='table'>
      <div className='table__head'>
        <HeadPart />
      </div>
      <div className='table__main'>
        {data.map((dataObj) => <TableLine data={dataObj} />)}
      </div>
    </div>
  )
}

export default connect(({data}) => ({data}))(Table)