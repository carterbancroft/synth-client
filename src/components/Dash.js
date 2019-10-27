import React from 'react'

import BpmWidget from './BpmWidget'
import InstrumentPicker from './InstrumentPicker'

import './Dash.scss'

// This is basically just a container for UI elements that are not the
// instruments themselves. Like the play button, instrument picker and BPM
// widget.
class Dash extends React.Component {
  render() {
    const isLooping = this.props.isLooping

    const icon = isLooping ?
      <i className='icono-pause' />
      : <i className='icono-play' />

    const isLoopingClass = isLooping ? 'isLooping' : ''

    return (
      <div className="dashboard">
        <InstrumentPicker
          key="instrumentPicker"
          addInstrument={ this.props.addInstrument }
          removeInstrument={ this.props.removeInstrument }
        />
        <button
          id="togglePlay"
          className={ `togglePlayButton ${isLoopingClass}` }
          onClick={ this.props.toggleLoop }>{ icon }</button>
        <BpmWidget currentBeat={ this.props.currentBeat } />
      </div>
    )
  }
}

export default Dash
