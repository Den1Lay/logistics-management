import React, {useState} from 'react';
import {connect} from 'react-redux'

import {Modal} from 'antd'
import {TextReducer, WarningMessage} from '@/components'

import './Firm.scss'

const Firm = ({data}) => {
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
      <Modal
        title="Persons firm editor"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => {console.log('CLOSE_EV');setVisible(false)}}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  )
}

export default connect(()=>({}), {})(Firm)

