import React from 'react'
import Tone from 'tone'


class BpmWidget extends React.Component {
  state = {
    // We'll keep track of what BPM we're running at at a given time.
    bpm: 120,
  }

  componentDidMount() {
    // Set the starting BPM so we've got something there when play is clicked
    // for the first time.
    Tone.Transport.bpm.value = this.state.bpm
  }

  updateBpm = e => {
    // BPM is set by typing in the field and hitting enter. Listen for enter
    // key (key code 13) events on the input field here.
    if (e.keyCode !== 13) return

    // Get the value from the BPM input, parse it and make sure it's valid
    // and update the Transport. The music will in real time change to match
    // the new BPM.
    const newBpm = parseInt(e.target.value)
    if (isNaN(newBpm)) {
      return alert('Invalid BPM value. Use a dang integer!')
    }

    Tone.Transport.bpm.value = newBpm
  }

  render() {
    // The BPM widget renders a blinker to light on every quarter note. Check
    // if we on one of those notes or not. If we are assign a class that makes
    // the blinker a brighter color (so it looks like it's flashing).
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
