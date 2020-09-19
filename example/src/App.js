import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Demo from './Demo'

const App = () => {
  return (
    <Switch>
      <Route exact path="/demo" component={Demo} />
      <Route path="/" component={Home} />
    </Switch>
  )
}

export default App
