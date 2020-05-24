import React from "react";
import { Menu, Icon } from 'semantic-ui-react'

class SideMenu extends React.Component {


  handleItemClick = (id) => {
    this.props.onChangeSelectemItem(id);
  }

  generateMenuItems = (lists) => {
    return lists.map((list, index) => {
      return <Menu.Item
                key={index}
                name={list.listName}
                active={this.props.activeItem === list._id}
                onClick={() => this.handleItemClick(list._id)}
              >
              <Icon className='editIcon'size='smal' link name='delete' color='red' onClick={() => this.props.onDeleteList(list)}></Icon>
              <Icon className='editIcon'size='smal' link name='copy' color='green' onClick={() => this.props.onCopyList(list)} ></Icon>
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