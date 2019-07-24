import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container';

import Contact from './Components/Contacts'
import DetailContact from './Components/DetailContact'

class App extends Component {
  render() {
    return (
      <Container maxWidth="md">
        <Switch>
          <Route path="/contact" component={Contact} />
          <Route path="/contacts/:uuid" component={DetailContact} />

          <Redirect from="/" to="/contact" />
        </Switch>
      </Container>
    );
  }
}

export default App;
