import React, { Component } from 'react';
import Translate from 'react-translate-component';
import { ListGroup, ListGroupItem, Label, Panel, Jumbotron, ButtonGroup, Button } from 'react-bootstrap';
import InternLabel from 'utils/intern-label';

const ErrorPanel = ({messageKey}) => (
  <ListGroup>
    <ListGroupItem bsStyle="danger">
      <Translate content={messageKey} />
    </ListGroupItem>
  </ListGroup>
);

export default class LoginForm extends Component {

  render() {
    const {errorMessage} = this.props;
    const errorPanel = errorMessage ? <ErrorPanel messageKey={errorMessage} /> : null;
    return (
      <div id="login-form">
        <Translate component="h2" content="login.title" />

        {errorPanel}
        <br/>
          <Button bsStyle="primary" onClick={() => this.handleSubmit('nyfix')}><InternLabel icon="sign-in" labelKey="login.with.nyfix"/></Button>
        <br/>
      </div>
    );
  }

  handleSubmit(auth) {
    const { login } = this.props;
    login(auth, this.props.location.query.redirect || '');
  }
}
