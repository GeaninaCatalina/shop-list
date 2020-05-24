import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { Button, Input, Form, Grid, Card } from 'semantic-ui-react';
import axios from 'axios';
import SideMenu from '../sideMenu/SideMenu.js';
import Content from '../content/Content.js';

class Lists extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      userInput: '',
      selectedItem: undefined
    }
  }

  componentWillMount() {
    this.getLists();
  }

  async getLists() {
    const response = await axios.get('http://localhost:4100/getlists', {
    });

    this.setState({ lists: response.data, selectedItem: response.data[0] });
  }

  onChangeSelectedItem = (newSelectedId) => {
    const selectedItem = this.state.lists.filter(item => item._id === newSelectedId)[0];

    this.setState({ selectedItem });
  }

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  onAddNewList = async () => {
    const { lists } = this.state;
    if (this.state.userInput !== '') {
      const newList = { listName: this.state.userInput, content: '' };
      const response = await this.onSubmitNewList(newList);
      if (response.status === 200) {
        lists.push(response.data);
        this.setState({ lists, userInput: '', selectedItem: response.data });
      }
    };
  }

  onCopyList = async (list) => {
    const { lists } = this.state;
    const newList = {listName:list.listName, content:list.content}; 
    console.log(newList);
    const response = await this.onSubmitNewList(newList);

    if (response.status === 200) {
      console.log(response.data)
      lists.push(response.data);
      this.setState({ lists, selectedItem: response.data });
      console.log(this.state.selectedItem)
    }
  };


  async onSubmitNewList(newList) {
    return await axios.post('http://localhost:4100/savelist', newList);
  }

  onInputChange = (event) => {
    this.setState({
      userInput: event.target.value
    });
  }

  onUpdateContent = async () => {
    const { _id, listName, content } = this.state.selectedItem;
    await axios.put('http://localhost:4100/updatelist',
      {
        _id: _id,
        listName: listName,
        content: content
      });
  }

  onChangeContent = (event) => {
    const newContent = event.target.value;
    const { lists, selectedItem } = this.state;

    selectedItem.content = newContent;
    lists.forEach(list => {
      if (list._id === selectedItem._id) {
        list.content = selectedItem.content;
      }
    })
    this.setState({ lists, selectedItem });
  }

  onChangeTitle = (event) => {
    const newListName = event.target.value;
    const { lists, selectedItem } = this.state;

    selectedItem.listName = newListName;
    lists.forEach(list => {
      if (list._id === selectedItem._id) {
        list.listName = selectedItem.listName;
      }
    })
    this.setState({ lists, selectedItem });
  }

  onDeleteList = async (list) => {
    const { lists } = this.state;

    const response = await axios.delete('http://localhost:4100/deletelist/' + list._id);
    console.log(list);
    console.log(response);
    if (response.status === 200) {
      const index = lists.indexOf(list);
      if (index > -1) {
        lists.splice(index, 1);
        this.setState({ lists });
      }
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <div>
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
              {this.state.selectedItem !== undefined ?
                <Grid.Row>
                  <Grid.Column width={4}>
                    <SideMenu
                      onDeleteList={this.onDeleteList}
                      activeItem={this.state.selectedItem._id}
                      lists={this.state.lists}
                      onChangeSelectemItem={this.onChangeSelectedItem}
                      onCopyList={this.onCopyList}
                    >
                    </SideMenu>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Content
                      selectedItem={this.state.selectedItem}
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
      </div>
    )
  }
}
export default withNamespaces()(Lists); 