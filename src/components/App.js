import React from 'react'

import Cell from './Cell'

import './App.css'


class App extends React.Component {
  render() {
    const cells = []
    for (let i = 0; i < 17; i++) {
      cells.push(<Cell id={ `cell-${i}` } />)
    }

    return (
      <div>
        { cells }
      </div>
    )
  }
}

export default App
