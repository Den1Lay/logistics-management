import React, {useState} from 'react'
import {connect} from 'react-redux'

import {TextReducer} from '@/components'
import {Modal} from 'antd'

import './Comment.scss'

const Comment = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className='comment' >
        <TextReducer onClick={() => setVisible(true)} text={'Comment'} clickable />
      </div>
      <Modal
        title="Comment editor"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  )
}

export default connect(() => ({}), {})(Comment)