import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PatientList from './components/PatientList';
import PatientProfile from './components/PatientProfile';

const App: React.FC = (): JSX.Element => (
  <Router>
    <Switch>
      <Route exact path="/patients">
        <PatientList />
      </Route>
      <Route path="/patients/:id">
        <PatientProfile />
      </Route>
      <Redirect exact from="/" to="/patients" />
    </Switch>
  </Router>
  )

export default App;
