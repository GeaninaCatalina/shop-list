import React from "react";
import { TextArea, Button } from 'semantic-ui-react';
import './Content.css';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';

class Content extends React.Component {

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    const { selectedItem } = this.props;
    return (
      <div>
        <div className='listTitle'>
          <span className='title'>
            {selectedItem.listName}
          </span>
        </div>
        <div className='textArea-container'>
          <TextArea className='textArea' placeholder={t('placeholder_text')} value={selectedItem.content} onChange={this.props.onContentChange} />
          <Button primary color='red' onClick={this.props.onSaveButton}>{t('save')}</Button>
        </div>
      </div>
    )
  }
}

export default withNamespaces()(Content);