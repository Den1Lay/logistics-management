import React,{useState} from 'react'
import {Modal, Select, Input, Mentions} from 'antd'

const WorkModal = ({source, visible, setVisible}) => {
  const [data, setData] = useState(source ? {...source} : {
    firstName: '',
    secondName: '', 
    lastName: '', 
    phone: '', 
    atl: ''
  })

  function onSave() {
    
  }

  const {firstName, secondName, lastName, phone, atl} = data;
  return <Modal
          title="Данные перевозчика"
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
                onChange={ev => setData({...data, firstName: ev})} 
                autoSize />
            </div>
            <div className='carrier__modal_secondName'>
              <Mentions 
                value={secondName}
                placeholder={'Second name'}
                onChange={ev => setData({...data, secondName: ev})} 
                autoSize />
            </div>
            <div className='carrier__modal_lastName'>
              <Mentions 
                value={lastName}
                placeholder={'Last name'}
                onChange={ev => setData({...data, lastName: ev})} 
                autoSize />
            </div>
            <div className='carrier__modal_phone'>
              <Mentions 
                value={phone}
                placeholder={'Phone number'}
                onChange={ev => setData({...data, phone: ev})} 
                autoSize />
            </div>
            <div className='carrier__modal_atl'>
              <Input 
                onChange={ev => setData({...data, atl: ev.target.value})}
                value={atl}
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