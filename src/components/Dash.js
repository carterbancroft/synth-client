import React from 'react'

import BpmWidget from './BpmWidget'
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
        <BpmWidget currentBeat={ this.props.currentBeat } />
      </div>
    )
  }
}

export default Dash
