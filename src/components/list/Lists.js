import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { Button, Input, Form, List } from 'semantic-ui-react';
import axios from 'axios';

class Lists extends Component {
  constructor() {
    super();
    this.state = {
      listName: [],
      userInput: ''
    }
  }

  componentWillMount() {
    this.getLists();
  }

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  onAddNewList = () => {
    const { listName } = this.state;
    if (this.state.userInput !== '') {
      listName.push(this.state.userInput );
      this.onSubmitNewList();
      this.setState({ listName, userInput: '' });
    };
  }

  onInputChange = (event) => {
    this.setState({
      userInput: event.target.value
    });

    console.log(this.state);
  }

  async onSubmitNewList() {
    const res = await axios.post('http://localhost:4100/savelist',
      {
        listName: this.state.userInput
      });
    console.log(res.data);
  }


  async getLists() {
    const response = await axios.get('http://localhost:4100/getlists', {
    });
    
    this.setState({ listName: response.data });
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
          <List divided relaxed floated='left'>
            {this.state.listName.map((list, index) => {
              return (
                <List.Item key={index}>
                  <List.Content>
                    <List.Header as='a'>{list}</List.Header>
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
        </div>
      </div>
    )
  }
}
export default withNamespaces()(Lists); 