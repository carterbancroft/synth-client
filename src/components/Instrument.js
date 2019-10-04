import React from 'react'

import Cell from './Cell'


class Instrument extends React.Component {
  render() {
    const cells = []

    for (let i = 0; i < 16; i++) {
      if (this.props.currentBeat === i) {
        cells.push(<Cell key={ i } isPlaying={true} />)
      }
      else {
        cells.push(<Cell key={ i } />)
      }
    }

    return (
      <div className="instrument">
        { cells }
      </div>
    )
  }
}

export default Instrument
