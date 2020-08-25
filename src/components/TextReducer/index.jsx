// отрабатывает несколько циклов уменьшения.
// сначала чекат высоту. Если она больше то, длина текста уменьшается и сейвится в локе
// Если width больше wrappera, то еще раз все уменьшается.

// Неожиданной проблемой стали пробемы, которые разделяют строку и как бы отрезают ее
// если она в overflow: hidden элементе
// фиксилось реплейсом, и предвыходным обработчиком

// на крайний случай просто подберу оптимальное количество символов

import React, {useState, useEffect, useRef} from 'react'
import classNames from 'classnames'
import {replaceAll} from '@/utils'

import {Tooltip} from 'antd';

import './TextReducer.scss'

const TextReducer = ({text='', onClick=()=>{}, clickable=false, dlsMessage=null}) => {
  console.log('%c%s','color: seagreen; font-size: 22px','RE_RENDER')
  const wrapperRef = useRef(null);
  const targetRef = useRef(null)
  const [originalText, setOriginalText] = useState(null)
  const [textData, setTextData] = useState({payload: replaceAll(text, ' ', '_'), ready: false, changed: false});

  useEffect(() => {
    if(originalText !== text) { // ручное обновление главного пропса
      setOriginalText(text);
      setTextData({payload: replaceAll(text, ' ', '_'), ready: false, changed: false})
    }

    const {clientWidth: wrapperW} = wrapperRef.current;
    const {clientWidth: targetW} = targetRef.current;
    const {payload, ready, changed} = textData;

    if(targetW > wrapperW) {
      let resStr = payload.substring(0, 0.85*payload.length/(targetW/wrapperW));
      setTextData({...textData, payload: resStr, changed: true});

    } else if(!ready) {
      let textWithSpace = replaceAll(payload, '_', ' ');
      textWithSpace = changed ? textWithSpace.substring(0, payload.length-3)+'...' : textWithSpace;
      setTextData({...textData, payload: textWithSpace, ready: true});
    }
  })

  return (
    <div ref={wrapperRef} className='textReducer'>
      <div 
        ref={targetRef} 
        className={classNames('textReducer__target', clickable && 'clickable')}  
        onClick={onClick}>
        {dlsMessage}
        { 
          textData.changed ?
          <Tooltip title={text}>
            {textData.payload}
          </Tooltip>
          : textData.payload
        }
      </div>
    </div>
  )
}

export default TextReducer