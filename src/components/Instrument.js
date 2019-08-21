import React from 'react'

import Cell from './Cell'


class Instrument extends React.Component {
  render() {
    const cells = []

    for (let i = 0; i < 17; i++) {
      cells.push(<Cell />)
    }

    return (
      <div className="instrument">
        { cells }
      </div>
    )
  }
}

export default Instrument
