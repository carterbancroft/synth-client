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

    return (
      <div onClick={ this.toggleCell } className={ `cell ${enabled ? "enabled" : ""} ${this.props.isPlaying ? "playing" : ""}` } />
    )
  }
}

export default Cell
