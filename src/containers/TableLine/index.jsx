// Данные которые приходят с верхнего компонента могут не запустить перерисовку компонента
// Так как при поверхностном сравнении они будут равны.
// Для ручного включении перерисовки вместе с обновленными данными приходит строка версии
// Которая при поверхностном сравнении будет отлична от предыдущей строки, что вызовет перерисовку.

import React, {useState} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {format} from 'date-fns'

import {DeleteOutlined} from '@ant-design/icons';
import {Firm, TextReducer, Comment, Carrier} from '@/components'

import {deleteNote} from '@/actions'

import './TableLine.scss'

const TableLine = ({data: {
  number, 
  receiveTime,
  firm,
  comment,
  carrier,
}, 
deleteNote
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [hover, setHover] = useState(false);
  console.log('%c%s', 'color: tomato; font-size: 22px;', 'Line RE_RENDER')
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
        <div className='tableLine__delete_btn' onClick={() => deleteNote(number)}>
          <DeleteOutlined />
        </div>
      </div>
      <div className={classNames('tableLine__main', 'tableLine__main'+(hover && '-hovered'))}>
    
        <div className={classNames('tableLine__main_numb')}>
          <TextReducer text={number} />
        </div>
        <div className={classNames('tableLine__main_date')}>
          <TextReducer text={format(new Date(receiveTime), 'dd/MM/yyyy kk:mm')} />
        </div>
        <div className={classNames('tableLine__main_firm')}>
          <Firm data={firm} address={number} />
        </div>
        <div className={classNames('tableLine__main_comment')}>
          <Comment data={comment} address={number} />
        </div>
        <div className={classNames('tableLine__main_carrier',)}>
          <Carrier data={carrier} address={number} />
        </div>
      </div>
    </div>
  )
}

export default connect(({v}) => ({v}), {deleteNote})(TableLine)