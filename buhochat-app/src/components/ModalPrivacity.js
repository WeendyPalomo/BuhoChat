import React, {useState} from 'react';
import {Collapse, Modal} from 'antd';
import "../styles/ModalEditeProfile.css"
import 'antd/dist/antd.css';


const ModalPrivacity = () =>{

    const [isModalVisible, setIsModalVisible] = useState(false);

     const showModal = () => {
    setIsModalVisible(true);
     };

    const handleOk = () => {
    setIsModalVisible(false);
    };

    const handleCancel = () => {
    setIsModalVisible(false);
    };

    const { Panel } = Collapse;
    function callback(key) {
        console.log(key);
      }
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
    `;

   
    

    return (
        <>
            <a type="primary" onClick={showModal}>
         Privacidad
            </a>

           
            <Modal title="Privacidad" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div class="contentenedor">
            <Collapse className="privacidad-collapse"defaultActiveKey={['1']} onChange={callback}>
            <Panel header="Usuarios Añadidos" key="1">
            <p>{text}</p>
            </Panel>
            <Panel header="Usuarios Bloqueados" key="2">
            <p>{text}</p>
            </Panel>
             <Panel header="Publicaciones Reportadas" key="3">
            <p>{text}</p>
             </Panel>
             <Panel header="Publicaciones Guardadas" key="4">
            <p>{text}</p>
             </Panel>
             <Panel header="Anonimo" key="5">
            <p>{text}</p>
             </Panel>
            </Collapse>,
            </div>

      </Modal>

           
     
        </>
    )

}
export default ModalPrivacity;
