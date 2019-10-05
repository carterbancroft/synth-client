import React from 'react'

import Cell from './Cell'


class Instrument extends React.Component {
  constructor(props) {
    super(props)

    if (this.props.synthOptions) {
      this.synth = new this.props.synth(this.props.synthOptions).toMaster()
    }
    else {
      this.synth = new this.props.synth().toMaster()
    }
  }

  play = () => {
    const attackRelease = this.props.attackRelease

    if (attackRelease.note) {
      this.synth.triggerAttackRelease(
        attackRelease.note,
        attackRelease.duration,
        attackRelease.time
      )
    }
    else {
      this.synth.triggerAttackRelease(
        attackRelease.duration,
        attackRelease.time,
        attackRelease.velocity
      )
    }
  }

  render() {
    const cells = []

    for (let i = 0; i < 16; i++) {
      cells.push(<Cell play={this.play} key={ i } isPlaying={ this.props.currentBeat === i } />)
    }

    return (
      <div className="instrument">
        { cells }
      </div>
    )
  }
}

export default Instrument
