// Компонент отвечает за отрисовку элемента таблицы с перевозчиком.
// И обработку всех событий, которые с ним связаны.

import React, {useState} from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import { SearchOutlined, CloseOutlined, SwapOutlined} from '@ant-design/icons';

import {TextReducer, WarningMessage} from '@/components'
import WorkModal from './Modal'
import {Select} from 'antd'

import {save, setCarrier} from '@/actions'

import './Carrier.scss'

const {Option} = Select

const Carrier = (
  {
    data, 
    carriers, 
    address, 
    v,

    save,
    setCarrier
  }
  ) => {
  const [visible, setVisible] = useState(false),
  [showDls, setShowDls] = useState(false),
  [searchMod, setSearchMod] = useState(false),
  options = carriers.map(({secondName, id}) => 
    <Option value={id}>{secondName}</Option>);
  
  let liveCarrier = null;
  if(data !== null) {
    for(let men of carriers) {
      if(men.id === data) {
        liveCarrier = men
      }
    }
  };
  //liveCarrier.setted = true;

  const dls = !liveCarrier
    ? <WarningMessage pass={' Не назначен!'} />
    : null;

  const showText = liveCarrier 
    ? `${liveCarrier.secondName} ${liveCarrier.firstName}` 
    : '';

  function handleSearch(ev) {
    console.log('SEARCH_EV:',ev)
  }

  function handleChange(ev) {

    console.log('CHANGE_EV:',ev);
    setSearchMod(!searchMod);
    setCarrier({address, pass: ev});
  }

  function handleTextsClick() {
    liveCarrier 
    ? setVisible(true)
    : setSearchMod(!searchMod)
  }
  return (
    <>
      <div className='carrier'
        onMouseEnter={() => setShowDls(true)}
        onMouseLeave={() => setShowDls(false)}>
        <div className='carrier__main' >
          {
            searchMod 
            ? <Select
                autoFocus
                showSearch
                placeholder={'Carriers second name'}
                style={{width: '100%'}}
                defaultValue={``}
                showArrow={false}
                onBlur={() => setSearchMod(!searchMod)}
                onSearch={handleSearch}
                onChange={handleChange}
              >
                {options}
              </Select>
            : <TextReducer 
                onClick={handleTextsClick} 
                text={showText} 
                dlsMessage={dls}
                clickable />
          }
        </div>
        <div 
          
          className={classNames('carrier__tools', 'carrier__tools'+(showDls?'-show':'-hide'))}>
          <div className='carrier__tools_search' onClick={() => setSearchMod(!searchMod)}>
            {searchMod ? <CloseOutlined /> : <SearchOutlined />}
          </div>
          <div className='carrier__tools_unset' onClick={() => {
            debugger;
            setCarrier({address, pass: null})
            setShowDls({showText: '', dls: <WarningMessage pass={' Не назначен!'} />}); 
            
            }}>
            <SwapOutlined />
          </div>
        </div>
      </div>
      <WorkModal 
        onSave={newData => {save({newData, address, field: 'carrier'});setVisible(false)}} 
        source={liveCarrier} 
        visible={visible} 
        setVisible={setVisible} 
        v={v}
        />
    </>
  )
}

export default connect(({carriers, v}) => ({carriers, v}), {save, setCarrier})(Carrier)
