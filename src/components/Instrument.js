import React from 'react'

import Cell from './Cell'


class Instrument extends React.Component {
  render() {
    const cells = []

    for (let i = 0; i < 16; i++) {
      cells.push(<Cell play={this.props.play} key={ i } isPlaying={ this.props.currentBeat === i } />)
    }

    return (
      <div className="instrument">
        { cells }
      </div>
    )
  }
}

export default Instrument
