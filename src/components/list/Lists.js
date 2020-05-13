import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { Tab, Button, Input } from 'semantic-ui-react';

class Lists extends Component {
  constructor(){
    super(); 
    this.state = {
      lists: [{listName: 'geanina'}]
    }
  }

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  onAddNewList = (listName) => {
    const { lists } = this.state;
    lists.push({
      listName
    });

    this.setState({lists});
  }

  
  render() {
    const { t } = this.props;
    const panes = [];
    this.state.lists.forEach(element => panes.push({ menuItem: element.listName, render: () => <Tab.Pane>Salut {element.listName} </Tab.Pane> }));

    return (
      <div>
        <Input action={{ icon: 'add' }} placeholder='Add list'/>
        {/* <Button circular icon='add' attached='right' content={t('lists_addButton')}/> */}
        <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes}></Tab> 
        
      </div>
    )
  }
}
export default withNamespaces()(Lists); 