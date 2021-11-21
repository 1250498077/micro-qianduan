import React, { useState, useEffect  } from 'react';
import { Modal, Button } from 'antd';

const App = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);



  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    // 需要暴露给外部调用的方法
    props.componentLoadCallback({
      showModal: showModal
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