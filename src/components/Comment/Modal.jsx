import React,{useState, useEffect} from 'react'
import {Modal, Select, Input, Mentions, Button} from 'antd'

const WorkModal = ({source, visible, setVisible, onSave, v}) => {
  const restartData = () => source ? {...source} : {
    short: '',
    big: '', 
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
    onSave(data)
  }
  

  const {short, big} = data;
  return <Modal
          title="Комментарий"
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
          <div className='comment__modal'>
            <div className='comment__modal_short'>
              <Mentions 
                value={short}
                placeholder={'Короткая версии'}
                onChange={ev => setData({...data, short: ev})} 
                autoSize />
            </div>
            <div className='comment__modal_big'>
              <Mentions 
                rows={6}
                value={big}
                placeholder={'Полная'}
                onChange={ev => setData({...data, big: ev})} />
            </div>
          </div>
        </Modal>
}

export default WorkModal;