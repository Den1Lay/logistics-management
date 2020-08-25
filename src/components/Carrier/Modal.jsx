// Всплывающее окно, которое появляется при клике на элемент таблицы.

import React,{useState, useEffect} from 'react'
import {Modal, Select, Input, Mentions, Button, message} from 'antd'

import {checkPhone} from '@/utils' 

const WorkModal = ({source, visible, setVisible, onSave, cleanAfterSave=false, v}) => {
  const restartData = () => source ? {...source} : {
    firstName: '',
    secondName: '', 
    lastName: '', 
    phone: '', 
    atl: ''
  }
  const [data, setData] = useState(restartData())
  const [checkV, setCheckV] = useState(null)

  useEffect(() => {
    if(checkV !== v) {
      setData(restartData());
      setCheckV(v)
    }
  })

  function saveClickHandler() {
    // make here some checks
    const {firstName, secondName, phone, atl} = data;

    let errors = [];
    // проверка данных с формы
    !firstName && errors.push('Требуется имя!');
    !secondName && errors.push('Требуется фамилия!');
    !atl &&  errors.push('ATI должен быть предоставлен');
    phone && !checkPhone(data.phone) && errors.push('Не корректный номер');
    !errors.length && onSave(data) && cleanAfterSave && setData(restartData());

    for(let er of errors) {
      message.error(er);
    }
  }

  const {firstName, secondName, lastName, phone, atl} = data;
  return <Modal
          title="Данные перевозчика"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => {setVisible(false); setData(restartData())}}
          footer={[
            <Button size='large' key="back" onClick={() => {setVisible(false); setData(restartData());}}>
              Отмена
            </Button>,
            <Button size='large' key="submit" type="primary" onClick={saveClickHandler}>
              Сохранить
            </Button>,
          ]}
        >
          <div className='carrier__modal'>
            <div className='carrier__modal_firstName'>
              <Mentions 
                value={firstName}
                placeholder={'Имя'}
                onChange={ev => setData({...data, firstName: ev})} 
                autoSize />
            </div>
            <div className='carrier__modal_secondName'>
              <Mentions 
                value={secondName}
                placeholder={'Фамилия'}
                onChange={ev => setData({...data, secondName: ev})} 
                autoSize />
            </div>
            <div className='carrier__modal_lastName'>
              <Mentions 
                value={lastName}
                placeholder={'Отчество'}
                onChange={ev => setData({...data, lastName: ev})} 
                autoSize />
            </div>
            <div className='carrier__modal_phone'>
              <Mentions 
                value={phone}
                placeholder={'Номер телефона'}
                onChange={ev => setData({...data, phone: ev})} 
                autoSize />
            </div>
            <div className='carrier__modal_atl'>
              <Input 
                onChange={ev => setData({...data, atl: ev.target.value})}
                value={atl}
                placeholder={'Код ati'}
                addonBefore="https://ati.su/firms/" 
                addonAfter="/info" 
                defaultValue={atl} />
            </div>
            <div className='carrier__modal_atiLink'>
              <a target="_blank" href={`https://ati.su/firms/${atl}/info`}>Ati link</a>
            </div>
          </div>
        </Modal>
}

export default WorkModal;