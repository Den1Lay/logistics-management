import React, {useState} from 'react'
import classNames from 'classnames'

import {DeleteOutlined} from '@ant-design/icons';
import {Firm, TextReducer, Comment, Carrier} from '@/components'

import './TableLine.scss'

const TableLine = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [hover, setHover] = useState(false)

  return (
    <div 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames('tableLine')}>
      <div 
        className={classNames('tableLine__delete', 'tableLine__delete'+(showDelete?'-show':'-hide'))}
        onMouseEnter={() => {console.log('mouseEnter'); setShowDelete(true)}} 
        onMouseLeave={() => {console.log('mouseLeave'); setShowDelete(false)}} 
        >
        <DeleteOutlined />
      </div>
      <div className={classNames('tableLine__main', 'tableLine__main'+(hover && '-hovered'))}>
    
        <div className={classNames('tableLine__main_numb')}>
          <TextReducer text={'13232323232323'} />
        </div>
        <div className={classNames('tableLine__main_date')}>
          <TextReducer text={'22/08/20 18:33'} />
        </div>
        <div className={classNames('tableLine__main_firm')}>
          <Firm />
        </div>
        <div className={classNames('tableLine__main_comment')}>
          <Comment />
        </div>
        <div className={classNames('tableLine__main_carrier',)}>
          <Carrier />
        </div>
      </div>
    </div>
  )
}

export default TableLine