import React, {useState} from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import { SearchOutlined } from '@ant-design/icons';

import {TextReducer} from '@/components'
import {Modal, Input} from 'antd'

import './Carrier.scss'

const Carrier = () => {
  const [visible, setVisible] = useState(false);
  const [showDls, setShowDls] = useState(false);

  return (
    <>
      <div className='carrier'
        onMouseEnter={() => setShowDls(true)}
        onMouseLeave={() => setShowDls(false)}>
        <div className='carrier__main' >
          <TextReducer onClick={() => setVisible(true)} text={'Carrier'} clickable />
        </div>
        <div className={classNames('carrier__search', 'carrier__search'+(showDls?'-show':'-hide'))}>
          <SearchOutlined />
        </div>
      </div>
      
      <Modal
        title="Carrier editor"
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

export default connect(() => ({}), {})(Carrier)
