import React, {useState} from 'react';
import {connect} from 'react-redux'

import {TextReducer, WarningMessage} from '@/components'
import WorkModal from './Modal';

import {save} from '@/actions'

import './Firm.scss'

const Firm = (
  {
    data, 
    address, 
    v,
  
    save,
  }) => {
  const [visible, setVisible] = useState(false)

  let dls = null;
  let showText = '';
  if(data) {
    showText = data.name;
  } else {
    dls = <WarningMessage 
      onClick={() => setVisible(true)} 
      clickable={true}
      pass={' Пустое поле'} />
  }

  return (
    <>
      <div 
        className='firm'>
        <TextReducer 
          onClick={() => setVisible(true)} 
          dlsMessage={dls}
          text={showText} 
          clickable={data} />
      </div>
      <WorkModal 
        onSave={newData => {save({newData, address, field: 'firm'});setVisible(false)}} 
        source={data}
        v={v}
        visible={visible} 
        setVisible={setVisible}/>
    </>
  )
}

export default connect(({v})=>({v}), {save})(Firm)

