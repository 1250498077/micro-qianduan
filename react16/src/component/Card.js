import React, { Component, Suspense } from 'react';

const Header = React.lazy(() => import("./Header"))
export default class Card extends React.Component {
  state = {
    vis: false
  }

  onClick = () => {
    this.setState({
        vis: true
    })
  }
  render() {
      return (
          <div>
              <button onClick={this.onClick}>按card钮</button>
              {/* <img src={Jiantou}  /> */}
              {/* <Jiantou /> */}
              {
                  this.state.vis ? <Suspense fallback={<div>loading....</div>}><Header /></Suspense> : null
              }
          </div>
      )
  }
} 