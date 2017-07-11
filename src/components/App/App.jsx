import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import styles from './app.css';
import EditClient from '../EditClient/EditClient';
import Clients from '../Clients/Clients';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/client">New Client</Link></li>
        </ul>
        <div>
          <Route exact path="/" component={Clients} />
          <Route path="/clients" component={Clients} />
          <Route exact path="/client" component={EditClient} />
          <Route path="/client/:id" component={EditClient} />
        </div>
      </div>
    </Router>
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
