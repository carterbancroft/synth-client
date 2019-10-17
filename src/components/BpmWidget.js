import React from 'react'
import Tone from 'tone'


class BpmWidget extends React.Component {
  state = {
    bpm: 120,
  }

  componentDidMount() {
    Tone.Transport.bpm.value = this.state.bpm
  }

  updateBpm = e => {
    if (e.keyCode !== 13) return

    const newBpm = parseInt(e.target.value)
    if (isNaN(newBpm)) {
      return alert('Invalid BPM value. Use a dang integer!')
    }

    Tone.Transport.bpm.value = newBpm
  }

  render() {
    const isLit = this.props.currentBeat % 4 === 0
    const litClass = isLit ? 'litBlinker' : ''

    return (
      <div className="bpmContainer">
        <input
          type="text"
          className="bpmSelector"
          key="bpmInput"
          defaultValue={ this.state.bpm }
          onKeyUp={ this.updateBpm }
        />
        <div className={ `blinker ${litClass}` } />
      </div>
    )
  }
}

export default BpmWidget
