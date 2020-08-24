import React, {useState} from 'react';
import { connect } from 'react-redux'

import {DatePicker, InputNumber, Button, Switch, Input} from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons';

import {setSearchData, setSearchType, newNote, setAssignFilter} from '@/actions'
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
  }) => {
  const [nR, setNR] = useState([0, 0]);
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
        <Button onClick={newNote} size='large' type='primary'>Create note</Button>
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
          <Button size='large' type='primary'>New carrier</Button>
        </div>
        <div className='actions__newCarrier_space'>

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
{setSearchData, setSearchType, setAssignFilter, newNote})(ActionsPart)