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
