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

import Home from 'ui/component/Home';
import {connect} from 'react-redux';
import {fetchSimple} from 'reducers/simple';

export default connect(
  state => ({items: state.simple.items}),
  {fetchSimple}
)(Home);
