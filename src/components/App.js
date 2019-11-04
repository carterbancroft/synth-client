import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Synth from './Synth'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={ Synth } exact={ true } />
          <Route path="/:recordingId" component={ Synth }/>
        </div>
      </Router>
    )
  }
}

export default App
