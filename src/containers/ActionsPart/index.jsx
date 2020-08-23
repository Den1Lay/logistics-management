import React, {useState} from 'react';
import { connect } from 'react-redux'

import {DatePicker, Input, Button, Switch} from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons';

import {setFilterData, setSearchType} from '@/actions'
import {getPlaceholder} from '@/utils'

import './ActionsPart.scss'

const {RangePicker} = DatePicker;

const ActionsPart = ({searchType, setFilterData, setSearchType}) => {
  const [searchData, setSearchData] = useState('')

  const mainInput = 
  <div className='actions_mainInput'>
    {
      searchType === 'date'
      ? <RangePicker 
          onChange={(ev) => setFilterData(ev)} 
          showTime={{ format: 'HH:mm' }} 
          format="YYYY-MM-DD HH:mm"
          />
      : searchType
      ? <div className='actions_mainInput'>
          <Input placeholder={getPlaceholder(searchType)} onChange={(ev) => setFilterData(ev.target.value)} />
        </div>
      : null
    } {
      searchType &&
      <div className='actions_mainInput_closeIcon' onClick={() => setSearchType(null)}>
        <CloseCircleOutlined />
      </div>
    }
    </div>

  return (
    <div className='actions'>
      <div className='actions__createNote'>
        <Button size='large' type='primary'>Create note</Button>
      </div>
      <div className='actions__searchZone'>
        {mainInput}
      </div>
      <div className='actions__filterZone'>
        <div className='actions__filterZone_text'>
          Только не назначенные
        </div>
        <div className='actions__filterZone_switch'>
          <Switch onChange={(ev) => console.log(ev)} />
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

export default connect(({searchType}) => ({searchType}), 
{setFilterData, setSearchType})(ActionsPart)