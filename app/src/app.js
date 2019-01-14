import React from 'react';
import { HashRouter as RouterContainer } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import stores from './store'
import { Layout } from 'antd'
import MainPage from './views/MainPage'

export default () => (
  <Provider {...stores}>
    <RouterContainer>
      <Layout.Content className='mainContent'>
        <Route exact path="/" component={MainPage} />
      </Layout.Content>
    </RouterContainer>
  </Provider>
)