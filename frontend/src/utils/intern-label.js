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

import React from 'react';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

let translate = counterpart.translate.bind(counterpart)

export default function InternLabel(props) {
  return props.icon ? (
    <span><i className={`fa fa-${props.icon} fa-fw`}></i> <Translate content={props.labelKey} /></span>
  ) : (
    <div>{translate(props.menuKey)}</div>
  )
}
