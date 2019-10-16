import React from 'react'

class Dash extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <button id="togglePlay" className="togglePlayButton" onClick={this.props.toggleLoop}>
          <i className="iconoo-play" />
        </button>
      </div>
    )
  }
}

export default Dash
