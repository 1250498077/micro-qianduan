import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const App = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);



  const showModal = () => {
    setIsModalVisible(true);
  };
  props.callback({
    showModal: showModal
  })

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