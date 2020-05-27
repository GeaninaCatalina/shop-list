import React from "react";
import { TextArea, Button } from 'semantic-ui-react';
import './Content.css';
import { withNamespaces } from 'react-i18next';
import i18n from '../../../i18n';

class Content extends React.Component {

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t, selectedItem } = this.props;
    
    return (
      <div>
        <div className='listTitle'>
          <TextArea className='textAreaTitle'
            row={1} value={selectedItem.listName}
            onChange={(e) => this.props.onChangeTitle(e)}>
          </TextArea>
        </div>
        <div className='textArea-container'>
          <TextArea className='textArea'
            placeholder={t('placeholder_text')}
            value={selectedItem.content}
            onChange={(event) => this.props.onContentChange(event, selectedItem._id)} />
          <Button primary color='red' onClick={this.props.onSaveButton}>{t('save')}</Button>
        </div>
      </div>
    )
  }
}

export default withNamespaces()(Content);