import React, {Component} from 'react';
import {connect} from 'react-redux';

import Translate from 'react-translate-component';

export class AccountPage extends Component {

  render() {
    return (
      <div>
        <Translate component="h2" content="settings.account.title"/>

        <Translate component="p" content="settings.account.greeting" name={this.props.user.name.displayName}/>
      </div>
    )
  }
}

export default connect(
  ({authentication}) => ({user: authentication.user})
)(AccountPage);
