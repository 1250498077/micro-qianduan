import React, { useState, useEffect, useCallback  } from 'react';
import { Modal, Button } from 'antd';



console.log('加载modal2modal2modal2modal2modal2')
const App = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);



  const showModal = useCallback(()=>{
    console.log('调用')
    setIsModalVisible(true);
  }, [])

  
  const closeModal = useCallback(()=>{
    console.log('调用')
    setIsModalVisible(false);
  }, [])

  useEffect(() => {
    // 需要暴露给外部调用的方法
    props.componentLoadCallback({
      showModal: showModal,
      closeModal: closeModal
    })
  }, [])


  const handleOk = () => {
    props.handleOk && props.handleOk();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.handleCancel && props.handleCancel();
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>2222222222222</p>
        <p>2222222222222</p>
        <p>2222222222222</p>
      </Modal>
    </>
  );
};
export default App;