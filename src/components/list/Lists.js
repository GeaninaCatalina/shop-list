import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { Button, Input, Form, List } from 'semantic-ui-react';

class Lists extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      userInput: ''
    }
  }

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }


  onClickAdd = () => {
    this.setState({ userInput: '' })
  }

  onAddNewList = (listName) => {
    const { lists } = this.state;
    if (this.state.userInput !== '') {
      lists.push({ listName: this.state.userInput });
      this.setState({ lists });
      this.onClickAdd();
    }
  }

  onInputChange = (event) => {
    this.setState({
      userInput: event.target.value
    });

    console.log(this.state);
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
          <List divided relaxed>
            {this.state.lists.map((list) => {
              return (
                <List.Item>
                  <List.Content>
                    <List.Header as='a'>{list.listName}</List.Header>
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