import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { withNamespaces } from 'react-i18next';
import i18n from './i18n';
import Login from './components/login/Login';
//import Lists from './components/list/Lists';
import Signin from './components/signin/Signin';
import NestedList from './NestedList';

class App extends Component {

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Button onClick={() => this.changeLanguage('fr')}>Fr</Button>
        <Button onClick={() => this.changeLanguage('en')}>En</Button>
        <header className='AppHeader'>
          <div className='overley'>
            <h1>{t('title')}</h1>
          </div>
        </header>
        <div>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/list-of-lists/lists" component={NestedList} />
              <Route exact path="/signin" component={Signin} />
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default withNamespaces()(App);