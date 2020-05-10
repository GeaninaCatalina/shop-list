import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';

class Lists extends Component {
  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    return (
      <Grid centered columns={2}>
      <Grid.Row>
        <Grid.Column width={7}></Grid.Column>
        <Grid.Column width={2} verticalAlign='middle'>Placeholder</Grid.Column>
      </Grid.Row>
    </Grid>
    )
  }
}
export default withNamespaces()(Lists); 