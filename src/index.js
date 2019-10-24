import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

import "bootstrap/dist/css/bootstrap.min.css"
import 'normalize.css'
import 'icono'
import './style/style.scss'


render(<App />, document.querySelector('#main'))
