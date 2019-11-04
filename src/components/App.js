import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Synth from './Synth'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Synth />
        </div>
      </Router>
    )
  }
}

export default App
