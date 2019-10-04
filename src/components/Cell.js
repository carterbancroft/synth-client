import React from 'react'

class Cell extends React.Component {
  state = {
    enabled: false,
  }

  toggleCell = () => {
    this.setState(prevState => ({ enabled: !prevState.enabled }))
  }

  render() {
    const { enabled } = this.state

    const enabledClass = enabled ? 'enabled' : ''
    const playingClass = this.props.isPlaying ? 'playing' : ''

    return (
      <div
        onClick={ this.toggleCell }
        className={ `cell ${ enabledClass } ${ playingClass }` }
      />
    )
  }
}

export default Cell
