import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

import 'normalize.css'
import 'icono'
import './style/style.scss'
import './style/custom.scss'


render(<App />, document.querySelector('#main'))
