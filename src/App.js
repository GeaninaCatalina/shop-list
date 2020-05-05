import React, { Component } from 'react';
import './App.css';
import { withNamespaces } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import { ButtonGroup, Button } from '@material-ui/core';

class App extends Component {

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={() => this.changeLanguage('fr')}>Fr</Button>
          <Button onClick={() => this.changeLanguage('en')}>En</Button>
        </ButtonGroup>
        <div className='AppHeader'>
          {t('title')}
        </div>
        <div>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login}></Route>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default withNamespaces()(App);