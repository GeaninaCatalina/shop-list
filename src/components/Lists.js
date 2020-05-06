import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import i18n from '../i18n';

class Lists extends Component {
  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    return (
      <div>
          {t('login_name')}
      </div>
    )
  }
}
export default withNamespaces()(Lists); 