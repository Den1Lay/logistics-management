// быстрый чек на ререндор и дальнейшее планирование от него
import React from 'react'

import {TableLine} from '@/components'
// фильтры 
import './Table.scss';

const Table = () => {
  return (
    <div className='table'>
      <div className='table__head'>
        
      </div>
      <div className='table__main'>
        <TableLine/>
      </div>
    </div>
  )
}

export default Table