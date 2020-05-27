import React, { Component } from 'react';
import './Lists.css';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n.js';
import { Button, Input, Form, Grid, Card } from 'semantic-ui-react';
import SideMenu from './sideMenu/SideMenu.js';
import Content from './content/Content.js';
import ListRestService from '../../service/ListRestService.js';

class Lists extends Component {
  state = {
    lists: [],
    userInput: '',
    selectedItemId: undefined
  }

  componentWillMount() {
    this.getLists();
  }

  async getLists() {
    const response = await ListRestService.getLists();
    const lists = response.data;
    this.setState({ lists, selectedItemId: lists[lists.length - 1]._id });
  }

  onChangeSelectedItem = (newSelectedId) => {
    this.setState({ selectedItemId: newSelectedId });
  }

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  onAddNewList = async () => {
    const { lists } = this.state;
    if (this.state.userInput !== '') {
      const newList = { listName: this.state.userInput, content: '' };
      const response = await ListRestService.saveList(newList);

      if (response.status === 200) {
        lists.push(response.data);
        this.setState({ lists, userInput: '', selectedItemId: lists[lists.length - 1]._id });
      }
    };
  }

  onCopyList = async (list) => {
    const { lists } = this.state;
    const newList = {listName:list.listName, content:list.content}; 
    const response = await ListRestService.saveList(newList);

    if (response.status === 200) {
      lists.push(response.data);
      this.setState({ lists, selectedItemId: response.data._id });
    }
  };

  onUpdateContent = async () => {
    const selectedItem = this.state.lists.filter(item => item._id === this.state.selectedItemId)[0];
    ListRestService.updateList(selectedItem);
  }

  onChangeContent = (event) => {
    const newContent = event.target.value;
    const { lists, selectedItemId } = this.state;

    lists.forEach(list => {
      if (list._id === selectedItemId) {
        list.content = newContent;
      }
    });

    this.setState({ lists });
  }

  onChangeTitle = (event) => {
    const { lists, selectedItemId } = this.state;

    lists.forEach(list => {
      if (list._id === selectedItemId) {
        list.listName = event.target.value;
      }
    })
    this.setState({ lists });
  }

  onDeleteList = async (list) => {
    const response = await ListRestService.deleteList(list._id);

    if (response.status === 200) {
      const { lists } = this.state;
      const index = lists.indexOf(list);
      if (index > -1) {
        lists.splice(index, 1);
        this.setState({ lists, selectedItemId: lists[lists.length - 1]._id });
      }
    }
  }

  onInputChange = (event) => {
    this.setState({
      userInput: event.target.value
    });
  }

  render() {
    const { t } = this.props;
    const selectedItem = this.state.lists.filter(item => item._id === this.state.selectedItemId)[0];

    return (
        <div className='listContainer'>
          <Form >
            <Form.Group widths='equal'>
              <Input placeholder={t('lists_addButton')}
                onChange={this.onInputChange}
                value={this.state.userInput}
              />
              <Button type='submit' icon='add' onClick={this.onAddNewList}></Button>
            </Form.Group>
          </Form>
          <Card fluid>
            <Grid columns={2} centered padded>
              {selectedItem !== undefined ?
                <Grid.Row>
                  <Grid.Column width={4}>
                    <SideMenu
                      onDeleteList={this.onDeleteList}
                      activeItem={this.state.selectedItemId}
                      lists={this.state.lists}
                      onChangeSelectemItem={this.onChangeSelectedItem}
                      onCopyList={this.onCopyList}
                    >
                    </SideMenu>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Content
                      selectedItem={selectedItem}
                      onChangeTitle={this.onChangeTitle}
                      onContentChange={this.onChangeContent}
                      onSaveButton={this.onUpdateContent}
                    >
                    </Content>
                  </Grid.Column>
                </Grid.Row> :
                <Grid.Row columns={1}>
                  <Grid.Column>
                    {t('no_lists_message')}
                  </Grid.Column>
                </Grid.Row>}
            </Grid>
          </Card>
        </div>
    )
  }
}
export default withNamespaces()(Lists); 