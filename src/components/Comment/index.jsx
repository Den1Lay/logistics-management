// Элемент таблицы с комментарием

import React, {useState} from 'react'
import {connect} from 'react-redux'

import {TextReducer, WarningMessage} from '@/components'
import WorkModal from './Modal'

import {save} from '@/actions'

import './Comment.scss'

const Comment = (
  {
    data, 
    address,
    v,

    save
  }) => {
  const [visible, setVisible] = useState(false);

  const showText = data
    ? data.short
    : '';
  const dls = !data 
    ? <WarningMessage pass=' Пустое поле!' />
    : null

  return (
    <>
      <div className='comment' >
        <TextReducer 
          onClick={() => setVisible(true)} 
          dlsMessage={dls}
          text={showText} 
          clickable />
      </div>
      <WorkModal 
        onSave={newData => {save({newData, address, field: 'comment'});setVisible(false)}} 
        source={data}
        v={v}
        visible={visible} 
        setVisible={setVisible} />
    </>
  )
}

export default connect(({v}) => ({v}), {save})(Comment)