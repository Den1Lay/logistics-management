// Всплывающее окно, которое появляется при клике на элемент таблицы.

import React,{useState, useEffect} from 'react'
import {Modal, Select, Input, Mentions, Button, message} from 'antd'

import {checkPhone} from '@/utils'

const WorkModal = ({source, visible, setVisible, onSave, v}) => {
  const restartData = () => source ? {...source} : {
    name: '',
    phone: '', 
  }
  const [data, setData] = useState(restartData());
  const [checkV, setCheckV] = useState(null)

  useEffect(() => {
    if(checkV !== v) {
      setData(restartData());
      setCheckV(v);
    }
  })

  function saveClickHandler() {
    // make here some checks
    let errors = [];
    !checkPhone(data.phone) && errors.push('Не корректный номер');
    data.name.length < 3 && errors.push('Название компании слишком короткое');
    !errors.length && onSave(data);

    for(let i of errors) {
      message.error(i)
    }
  }
  

  const {name, phone} = data;
  return <Modal
          title="Фирма клиента"
          centered
          visible={visible}
          //onOk={() => setVisible(false)}
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
          <div className='firm__modal'>
            <div className='firm__modal_short'>
              <Mentions 
                value={name}
                placeholder={'Название фирмы'}
                onChange={ev => setData({...data, name: ev})} 
                autoSize />
            </div>
            <div className='firm__modal_big'>
              <Mentions 
                value={phone}
                placeholder={'Телефон'}
                onChange={ev => setData({...data, phone: ev})} />
            </div>
          </div>
        </Modal>
}

export default WorkModal;