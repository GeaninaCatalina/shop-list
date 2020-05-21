import React from "react";

class Content extends React.Component {

  render() {
    const { selectedItem } = this.props;
    return(
      <div>
        <span>{selectedItem.name}</span>
        <br></br>
        <span>{selectedItem.content}</span>
      </div>
    )
  }
}

export default Content;