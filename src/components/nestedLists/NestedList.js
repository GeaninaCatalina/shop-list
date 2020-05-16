import React, { Component } from 'react';
import './NestedList.css';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import Lists from './../list/Lists';

class NestedList extends Component {

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }


  render() {
    // const { t } = this.props;
    return (
      <div>
        <div>
          <Grid centered columns={3} >
            <Grid.Row>
              <Grid.Column width={3}></Grid.Column>
              <Grid.Column width={5} verticalAlign='middle'>
                <Switch>
                  <Route exact path="/list-of-lists/lists" component={Lists} />
                </Switch>
              </Grid.Column>
              <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withNamespaces()(NestedList);