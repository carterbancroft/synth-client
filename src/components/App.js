import React from 'react'
import Tone from 'tone'

import './App.css'

Tone.Transport.bpm.value = 120

const synth = new Tone.Synth().toMaster()

class App extends React.Component {
  constructor() {
    super(...arguments)

    this.movePlayhead = this.movePlayhead.bind(this)
  }

  playSound() {
    synth.triggerAttackRelease("C4", "8n")
  }

  playLoop() {
    const loop = new Tone.Loop(function(time){
      console.log('in')
      synth.triggerAttackRelease("C2", "8n", time)
    }, "4n")
    loop.start("1m").stop("4m")

    Tone.Transport.start()

    document.querySelector(".playhead").bind(Tone.Transport)
  }

  movePlayhead() {
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={ this.playSound }>
          Note
        </button>

        <button
          className="btn btn-primary"
          onClick={ this.playLoop }>
          Loop
        </button>

        <div className="playbox">
          <div className="playhead"/>
        </div>
      </div>
    )
  }
}

export default App
