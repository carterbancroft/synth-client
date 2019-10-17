import React from 'react'

import BpmSelector from './BpmSelector'
import InstrumentPicker from './InstrumentPicker'

class Dash extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <InstrumentPicker
          key="instrumentPicker"
          addInstrument={ this.props.addInstrument }
          removeInstrument={ this.props.removeInstrument }
        />
        <button id="togglePlay" className="togglePlayButton" onClick={this.props.toggleLoop}>
          &#9656;
        </button>
        <BpmSelector />
      </div>
    )
  }
}

export default Dash
