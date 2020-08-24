import React, {useState, useEffect} from 'react'
import classNames from 'classnames'
import {connect, batch} from 'react-redux'
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
  //[editData, setEditData] = useState({setted: false, firstName: '', secondName: '', lastName: '', phone: '', atl: ''}),
  //[showData, setShowData] = useState({dls: null, showText: ''}),
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
    ? liveCarrier.secondName 
    : '';

  // useEffect(() => {
  //   //console.log('FFF_update')
  //   //setShowData({showText, dls});
  //   liveCarrier 
  //   ? !editData.setted && setEditData(liveCarrier) // первый рендер 
  //   // если обновился и не нашел рабочего чела.
  //   : !editData.setted && setEditData({setted: true, firstName: '', secondName: '', lastName: '', phone: '', atl: ''})
  // })


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
      {/* <Modal
        title="Carrier editor"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => {console.log('CLOSE_EV');setVisible(false)}}
      >
        <div className='carrier__modal'>
          <div className='carrier__modal_firstName'>
            <Mentions 
              value={firstName}
              placeholder={'First name'}
              onChange={(ev) => console.log('FirstName_change:', ev)} 
              autoSize />
          </div>
          <div className='carrier__modal_secondName'>

          </div>
          <div className='carrier__modal_lastName'>

          </div>
          <div className='carrier__modal_phone'>

          </div>
          <div className='carrier__modal_atl'>
            <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
          </div>
          <div className='carrier__modal_atlLink'>

          </div>
        </div>
      </Modal> */}
    </>
  )
}

export default connect(({carriers, v}) => ({carriers, v}), {save, setCarrier})(Carrier)
