import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import 'semantic-ui-css/semantic.min.css';
import './app.css';
import ClientForm from '../EditClient/ClientForm';
import Clients from '../Clients/Clients';
import TopMenu from './Menu';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Router>
      <div>
        <TopMenu />
        <div>
          <Route exact path="/" component={Clients} />
          <Route path="/clients" component={Clients} />
          <Route exact path="/client" component={ClientForm} />
          <Route path="/client/:id" component={ClientForm} />
        </div>
      </div>
    </Router>
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
