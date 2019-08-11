import React from 'react'
import Tone from 'tone'

const synth = new Tone.Synth().toMaster()

class App extends React.Component {
  playSound() {
    synth.triggerAttackRelease("C4", "8n")
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={ this.playSound }>
          Hello World
        </button>
      </div>
    )
  }
}

export default App
