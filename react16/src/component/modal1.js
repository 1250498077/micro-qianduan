import React, { useState, useContext } from 'react';
import { Modal, Button } from 'antd';


const App = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function showModal () {
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
        <p>11111111111111WWWWWWW1</p>
        <p>111111111111111</p>
        <p>111111111111111</p>
      </Modal>
    </>
  );
};
export default App;