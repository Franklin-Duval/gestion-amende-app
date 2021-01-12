import React from 'react';
import '../assets/css/pane.css'

export default class Pane extends React.Component {

  render() {
    return (
      <div className="pane">
        <div className="pane-title">
          <span>{this.props.title}</span>
        </div>
        <div className="pane-content">
          <p>Content</p>
        </div>
      </div>
    )
  }
}