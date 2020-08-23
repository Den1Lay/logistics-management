import React from 'react'
import classNames from 'classnames'
import { WarningOutlined } from '@ant-design/icons';

import './WarningMessage.scss';

const WarningMessage = ({onClick=()=>{}, clickable=false, pass}) => {
  return (
    <div 
      onClick={onClick}
      className={classNames('warningMessage', clickable && 'clickable')}>
      <WarningOutlined style={{color: 'gold'}} />
      {pass}
    </div>
  )
}

export default WarningMessage

