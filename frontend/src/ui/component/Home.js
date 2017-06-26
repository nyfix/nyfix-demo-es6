/*************************************************************************
 * ULLINK CONFIDENTIAL INFORMATION
 * _______________________________
 *
 * All Rights Reserved.
 *
 * NOTICE: This file and its content are the property of Ullink. The
 * information included has been classified as Confidential and may
 * not be copied, modified, distributed, or otherwise disseminated, in
 * whole or part, without the express written permission of Ullink.
 ************************************************************************/

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
