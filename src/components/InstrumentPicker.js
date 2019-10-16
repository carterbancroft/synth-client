import React from 'react'

import instruments from '../instruments'


class InstrumentPicker extends React.Component {
  toggleInstrument = e => {
    const name = e.target.value
    const isChecked = e.target.checked
    const instrument = instruments.find(i => i.name === name)

    isChecked ?
      this.props.addInstrument(instrument) :
      this.props.removeInstrument(instrument.name)
  }

  componentDidMount() {
    // Add all the instruments on startup
    instruments.forEach(i => this.props.addInstrument(i))
  }

  render() {
    const checkboxes = instruments.map(instrument => {
      return (
        <li key={ instrument.id }>
          <input
            defaultChecked
            type="checkbox"
            key={ instrument.id }
            value={ instrument.name }
            onClick= { this.toggleInstrument } />
          <label>{ instrument.name }</label>
        </li>
      )
    })

    return (
      <div>
        <ul className="instrumentSelector">
          { checkboxes }
        </ul>
      </div>
    )
  }
}

export default InstrumentPicker
