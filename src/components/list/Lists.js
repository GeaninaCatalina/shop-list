import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class Lists extends Component {
  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    const panes = [
      { menuItem: '1st list created', render: () => <Tab.Pane>Drop Content 1 </Tab.Pane> },
      { menuItem: '2nd list', render: () => <Tab.Pane>Drop Content 2</Tab.Pane> },
      { menuItem: '3th list', render: () => <Tab.Pane>Drop Content 3</Tab.Pane> },
    ]
    return (
      <div>
        {/* <Link>+ {t('lists_addButton')}</Link> */}
        <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
      </div>
    )
  }
}
export default withNamespaces()(Lists); 