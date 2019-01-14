import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/common.less'
import App from './app'

const render = (Component) => {
	ReactDOM.render(
		<Component />,
		document.getElementById('root')
	)
}

render(App)