import React, { Component } from 'react';
import './App.css';
import { withNamespaces } from 'react-i18next';
import i18n from './i18n';

class App extends Component {

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render(){
    const {t} = this.props;
    return(
      <div>
      <button onClick={() => this.changeLanguage('fr')}>fr</button>
      <button onClick={() => this.changeLanguage('en')}>en</button>
        {t('title')} 
      </div>
    )
  }
}

export default withNamespaces()(App);