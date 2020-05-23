import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { Button, Input, Form, Grid, Card } from 'semantic-ui-react';
import axios from 'axios';
import SideMenu from '../sideMenu/SideMenu.js';
import Content from '../content/Content.js';
import { v4 as uuid } from 'uuid';

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

  onChangeSelectedItem = (newSelectedItem) => {
    const selectedItem = this.state.lists.filter(item => item.listName === newSelectedItem)[0];

    this.setState({ selectedItem });
  }

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  onAddNewList = () => {
    const { lists } = this.state;
    if (this.state.userInput !== '') {
      const id = uuid();
      const newList = {id, listName: this.state.userInput, content: '' };
      lists.push(newList);
      this.onSubmitNewList();
      this.setState({ lists, userInput: '', selectedItem: newList });
    };
  }

  onInputChange = (event) => {
    this.setState({
      userInput: event.target.value
    });
  }

  async onSubmitNewList() {
    await axios.post('http://localhost:4100/savelist',
      {
        listName: this.state.userInput,
        content: this.state.userInput
      });
  }

  onUpdateContent = async () => {
    const {listName, content} = this.state.selectedItem;

    await axios.put('http://localhost:4100/updatelist',
    {
      listName: listName,
      content: content
    });
  }

  onChangeContent = (event) => {
    const newContent = event.target.value;
    const {lists, selectedItem} = this.state;

    selectedItem.content = newContent;
    lists.forEach(list => {
      if(list.listName === selectedItem.listName) {
       list.content = selectedItem.content;
      }
    })
    console.log(lists)
    this.setState({lists, selectedItem});
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
                    <SideMenu activeItem={this.state.selectedItem.listName} lists={this.state.lists} onChangeSelectemItem={this.onChangeSelectedItem}>
                    </SideMenu>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Content selectedItem={this.state.selectedItem} onContentChange={this.onChangeContent} onSaveButton={this.onUpdateContent}></Content>
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