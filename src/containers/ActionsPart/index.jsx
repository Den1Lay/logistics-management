import React, {useState} from 'react';
import { connect } from 'react-redux'

import WorkModal from '@/components/Carrier/Modal'
import {DatePicker, InputNumber, Button, Switch, Input} from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons';

import {setSearchData, setSearchType, newNote, setAssignFilter, newCarrier} from '@/actions'
import {getPlaceholder} from '@/utils'

import './ActionsPart.scss'

const {RangePicker} = DatePicker;

const ActionsPart = (
  {
    searchType, 
    onliNotAssigned, 
    
    setSearchData, 
    setSearchType, 
    setAssignFilter,
    newNote, 
    newCarrier,
  }) => {
  const [visible, setVisible] = useState(false);
  const [nR, setNR] = useState([0, 0]); // здесь сейвится диапазон поиска по number
  (nR[0] || nR[1]) && searchType !== 'number' && setNR([0, 0]);

  let mainInput = null;
  

  if(searchType) {
    switch(searchType) {
      case 'date':
        mainInput =
        <RangePicker
          autoFocus 
          onChange={(ev) => setSearchData(ev)} 
          showTime={{ format: 'HH:mm' }} 
          format="YYYY-MM-DD HH:mm"
          /> 
      break;
      case 'number':
        mainInput = 
        <>
          <div className='actions_mainInput_prefix'>От</div>
          <InputNumber value={nR[0]} onChange={ev => {setNR([ev, nR[1]]); setSearchData([ev, nR[1]])}} />
          <div className='actions_mainInput_prefix'>До</div> 
          <InputNumber autoFocus value={nR[1]}  onChange={ev => {setNR([nR[0], ev]); setSearchData([nR[0], ev])}} />
        </>
      break
      default: 
        mainInput = 
        <Input 
          autoFocus
          placeholder={getPlaceholder(searchType)} 
          onChange={(ev) => setSearchData(ev.target.value)} />
    }
  }
  

  return (
    <div className='actions'>
      <div className='actions__createNote'>
        <Button onClick={newNote} size='large' type='primary'>Новая заявка</Button>
      </div>
      <div className='actions__searchZone'>
        <div className='actions_mainInput'>
          {mainInput}
        </div>
        {
          searchType &&
          <div className='actions_mainInput_closeIcon' onClick={() => setSearchType(null)}>
            <CloseCircleOutlined />
          </div>
        }
      </div>
      <div className='actions__filterZone'>
        <div className='actions__filterZone_text'>
          Только не назначенные
        </div>
        <div className='actions__filterZone_switch'>
          <Switch defaultChecked={onliNotAssigned} onChange={setAssignFilter} />
        </div>
      </div>
      <div className='actions__newCarrier'>
        <div className='actions__newCarrier_main'>
          <Button onClick={() => setVisible(true)} size='large' type='primary'>Добавить перевозчика</Button>
        </div>
        <div className='actions__newCarrier_space'>
          <WorkModal
            onSave={carrierData => {newCarrier(carrierData);setVisible(false)}} 
            source={null} 
            visible={visible} 
            setVisible={setVisible} 
            v={null}
           />
        </div>
      </div>
    </div>
  )
}

export default connect((
  {
    searchType, 
    onliNotAssigned
  }) => ({
    searchType, 
    onliNotAssigned
  }), 
  {
    setSearchData, 
    setSearchType, 
    setAssignFilter, 
    newNote, 
    newCarrier
  })(ActionsPart)