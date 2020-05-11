import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { withNamespaces } from 'react-i18next';
import i18n from './i18n';
import Lists from './components/list/Lists';

class NestedList extends Component {

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <p>Maybe all is just in our imagination</p>
        <div>
            <Switch>
              <Route exact path="/list-of-lists/lists" component={Lists} />
            </Switch>
        </div>
      </div>
    )
  }
}

export default withNamespaces()(NestedList);