import Modal1 from './component/modal1';
import Modal2 from './component/modal2';

let modal = <div>loading......</div>
export const getComponent = (componentName, props) => {
  if (componentName === 'Modal1') {
    modal = <Modal1 {...props}  />
  } else if (componentName === 'Modal2') {
    modal = <Modal2 {...props}  />
  }
  return modal;
}
