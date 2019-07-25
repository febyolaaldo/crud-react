import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container';

import Contact from './Components/Contacts'

class App extends Component {
  render() {
    return (
      <Container maxWidth="md">
        <Switch>
          <Route path="/contact" component={Contact} />

          <Redirect from="/" to="/contact" />
        </Switch>
      </Container>
    );
  }
}

export default App;
