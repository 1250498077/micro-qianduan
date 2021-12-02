import React, { Suspense } from 'react';


const Modal1 = React.lazy(() => import("./component/modal1"))
const Modal2 = React.lazy(() => import("./component/modal2"))
let modal = <div>loading......</div>
export const getComponent = (componentName, props) => {
  if (componentName === 'Modal1') {
    modal = <Suspense fallback={<div>loading....</div>}>{<Modal1 {...props}  />}</Suspense>
  } else if (componentName === 'Modal2') {
    modal = <Suspense fallback={<div>loading....</div>}>{<Modal2 {...props}  />}</Suspense>
  }
  return modal;
}
