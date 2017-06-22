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

import LoginForm from 'ui/component/LoginForm';
import {connect} from 'react-redux';
import {login} from 'reducers/authentication';

export default connect(
  state => ({errorMessage: state.authentication.errorMessage}),
  {login}
)(LoginForm);
