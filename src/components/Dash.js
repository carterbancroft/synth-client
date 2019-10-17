import React from 'react'

import BpmWidget from './BpmWidget'
import InstrumentPicker from './InstrumentPicker'

// This is basically just a container for UI elements that are not the
// instruments themselves. Like the play button, instrument picker and BPM
// widget.
class Dash extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <InstrumentPicker
          key="instrumentPicker"
          addInstrument={ this.props.addInstrument }
          removeInstrument={ this.props.removeInstrument }
        />
        <button
          id="togglePlay"
          className="togglePlayButton"
          onClick={this.props.toggleLoop}>&#9656;</button>
        <BpmWidget currentBeat={ this.props.currentBeat } />
      </div>
    )
  }
}

export default Dash
