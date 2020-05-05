import React, { Component } from 'react';
import './App.css';
import { withNamespaces } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';

class App extends Component {

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <button onClick={() => this.changeLanguage('fr')}>fr</button>
        <button onClick={() => this.changeLanguage('en')}>en</button>
        {t('title')}
        <Router>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default withNamespaces()(App);