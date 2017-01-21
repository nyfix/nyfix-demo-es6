import React, {Component} from 'react';
import { ListGroup, ListGroupItem, Label, Panel, Jumbotron, ButtonGroup, Button } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    var items = this.props.items;
    var list = items.map((item, index) => <li key={index}>{item}</li>);

    return (
      <Jumbotron>
        <h2>Home</h2>
      </Jumbotron>
    );
  }
}
