import React from 'react'

// This defines an individual pad for a drum machine. Right now instruments
// are just drums and are entirely made up of these pads.
class Pad extends React.Component {
  state = {
    enabled: false,
  }

  togglePad = () => {
    this.setState(prevState => ({ enabled: !prevState.enabled }))
    this.props.updateRecording(this.props.cellId)
  }

  componentDidMount() {
    if (!this.props.recordingState) return

    this.setState({ enabled: true })
  }

  render() {
    // When a particular pad is clicked we need to make it be "enabled".
    // Enabling it means it gets special styling (so it's visually enabled)
    // and also it means when we're on the beat that corresponds with this pad
    // the hit is played.
    const { enabled } = this.state

    const enabledClass = enabled ? 'enabled' : ''
    const playingClass = this.props.isPlaying ? 'playing' : ''

    // Check if we're looping and if the currently touched pad is enabled. If
    // so, style it and play the friggin' note!
    const isHit = enabled && this.props.isPlaying
    const hitClass = isHit ? 'hit' : ''
    if (isHit) {
      this.props.play()
    }

    return (
      <div
        onClick={ this.togglePad }
        className={ `pad ${ enabledClass } ${ playingClass } ${ hitClass }` }
      />
    )
  }
}

export default Pad
