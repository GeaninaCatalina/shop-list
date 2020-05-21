import React from "react";
import { TextArea, Button, Form } from 'semantic-ui-react';

class Content extends React.Component {

  render() {
    const { selectedItem } = this.props;
    return(
      <div>
        <span>{selectedItem.listname}</span>
        <br></br>
        <Form> 
        <TextArea placeholder='Tell us more' value={selectedItem.content} style={{ minHeight: 100, minWidth:200 }} onChange={this.props.onContentChange}/>
        <Button primary onClick={this.props.onSaveButton}>Save</Button>
        </Form>
      </div>
    )
  }
}

export default Content;