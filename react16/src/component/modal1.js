import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Button } from 'antd';
import styles from './index.scss'

console.log('加载modal1modal1modal1modal1')
const App = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log('render App')
  // function showModal () {
  //   setIsModalVisible(true);
  // };
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
    props.componentLoadCallback && props.componentLoadCallback({
      showModal: showModal,
      closeModal: closeModal
    })
  }, [])

  const handleOk = useCallback(() => {
    props.handleOk && props.handleOk();
    setIsModalVisible(false);
  });

  const handleCancel = useCallback(() => {
    props.handleCancel && props.handleCancel();
    setIsModalVisible(false);
  });

  return (
    <>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className={styles.testFont}>
          <p>111111111111111</p>
          <p>111111111111111</p>
          <p>111111111111111</p>
        </div>
      </Modal>
    </>
  );
};
export default App;