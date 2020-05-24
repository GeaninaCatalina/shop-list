import React from "react";
import { Menu, Icon } from 'semantic-ui-react'

class SideMenu extends React.Component {


  handleItemClick = (e, { name }) => {
    this.props.onChangeSelectemItem(name);
  }

  generateMenuItems = (lists) => {
    return lists.map((list, index) => {
      return <Menu.Item
                key={index}
                name={list.listName}
                active={this.props.activeItem === list.listName}
                onClick={this.handleItemClick}
              >
              <Icon className='editIcon'size='large' link name='delete' onClick={() => this.props.onDeleteList(list)}></Icon>
              <Icon className='editIcon'size='large' link name='pencil'></Icon>
              {list.listName}
              </Menu.Item>
    });
  }

  render() {
    const { lists } = this.props;
    return(
      <Menu fluid vertical tabular>
        {this.generateMenuItems(lists)}
      </Menu>
    )
  }
}

export default SideMenu;