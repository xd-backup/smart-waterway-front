import React from 'react'
import ReactDom from 'react-dom'

import App from './App'
import store from './stores'

ReactDom.render(<App store={store} />, document.getElementById('mobx_container'))
