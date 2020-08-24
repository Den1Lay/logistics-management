import React, {useState} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import { UpOutlined } from '@ant-design/icons';

import {setPolarFilter, setSearchType} from '@/actions';

import './HeadElement.scss';

const HeadElement = (
  {
    type, 
    text, 
    reverse, 
    reverseType, 
    setPolarFilter, 
    searchType, 
    withPolarityFilter=false,
    setSearchType
  }) => {
  //const [searchMod, setSearchMod] = useState(false);  

  const [hoverIcon, setHoverIcon] = useState(false)

  const isWorkPolarity = reverseType === type;
  const isWorkSearchType = searchType === type;

  return (
    <div className='headElement'>
      <div 
        className={classNames('headElement__main', isWorkSearchType && 'headElement__main-work')} 
        onClick={() => setSearchType(type)}>
        <div className='textWrapper'>
          {text}
        </div>
      </div>
      <div 
        onClick={() => setPolarFilter(type)}
        className={classNames(
          'headElement__polarityFilter', 
          reverse && 'headElement__polarityFilter-revers'
        )}>

        {
          withPolarityFilter && 
          <div 
            onMouseEnter={() => setHoverIcon(true)}
            onMouseLeave={() => setHoverIcon(false)}
            className='iconWrapper'>
            <UpOutlined style={{
              color: 
              hoverIcon
              ? '#1890ff'
              : isWorkPolarity 
                ? '#1890ff' 
                : 'rgba(0, 0, 0, 0.65)',
              fontSize: '2vh'
              }} />
          </div>
        }
      </div>
    </div>
  )
}

export default connect(({
  reverse, 
  reverseType,
  searchType
}) => {
  return {reverse, reverseType, searchType}}, 
{setPolarFilter, setSearchType})(HeadElement)