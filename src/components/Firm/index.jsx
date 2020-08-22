import React, {useState} from 'react';
import {connect} from 'react-redux'

import {Modal} from 'antd'
import {TextReducer} from '@/components'

import './Firm.scss'

const Firm = ({}) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div 
        className='firm'>
        <TextReducer onClick={() => setVisible(true)} text={'FirmName'} clickable />
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

