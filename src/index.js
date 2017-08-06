import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import CSVTransformer from './CSVTransformer'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<CSVTransformer />, document.getElementById('root'))
registerServiceWorker()
