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
