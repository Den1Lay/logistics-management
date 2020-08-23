import React, {useState} from 'react'
import classNames from 'classnames'
import {format} from 'date-fns'

import {DeleteOutlined} from '@ant-design/icons';
import {Firm, TextReducer, Comment, Carrier} from '@/components'

import './TableLine.scss'

const TableLine = ({data: {
  number, 
  receiveTime,
  firm,
  comment,
  carrier,
}}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [hover, setHover] = useState(false)

  return (
    <div 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames('tableLine')}>
      <div 
        className={classNames('tableLine__delete', 'tableLine__delete'+(showDelete?'-show':'-hide'))}
        onMouseEnter={() => setShowDelete(true)} 
        onMouseLeave={() => setShowDelete(false)} 
        >
        <DeleteOutlined />
      </div>
      <div className={classNames('tableLine__main', 'tableLine__main'+(hover && '-hovered'))}>
    
        <div className={classNames('tableLine__main_numb')}>
          <TextReducer text={number} />
        </div>
        <div className={classNames('tableLine__main_date')}>
          <TextReducer text={format(new Date(receiveTime), 'dd/MM/yyyy mm:kk')} />
        </div>
        <div className={classNames('tableLine__main_firm')}>
          <Firm data={firm} />
        </div>
        <div className={classNames('tableLine__main_comment')}>
          <Comment data={comment} />
        </div>
        <div className={classNames('tableLine__main_carrier',)}>
          <Carrier data={carrier} />
        </div>
      </div>
    </div>
  )
}

export default TableLine