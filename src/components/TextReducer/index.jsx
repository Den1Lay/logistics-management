// Компонент обрезает строку и добавляет для нее вспомогательное окно
// В котором находится все содержимое строки. 
// Окно появляется, если навести мышью на обрезанный текст.

import React, {useState, useEffect, useRef} from 'react'
import classNames from 'classnames'
import {replaceAll} from '@/utils'

import {Tooltip} from 'antd';

import './TextReducer.scss'

const TextReducer = ({text='', onClick=()=>{}, clickable=false, dlsMessage=null}) => {
  const wrapperRef = useRef(null);
  const targetRef = useRef(null)
  const [originalText, setOriginalText] = useState(null)
  const [textData, setTextData] = useState({payload: replaceAll(text, ' ', '_'), ready: false, changed: false});

  useEffect(() => {
    // любой текст с пробелами превращается в строку у которой будет определенная длина 
    // и на основе сравнения ширины строки и Wrapper'a происходит уменьшение. 

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