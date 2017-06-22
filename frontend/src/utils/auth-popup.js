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

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/* istanbul ignore next */
var settings = "scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no";

/* istanbul ignore next */
function getPopupOffset({width, height}) {
  var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  var wTop = window.screenTop ? window.screenTop : window.screenY;

  var left = wLeft + (window.innerWidth / 2) - (width / 2);
  var top = wTop + (window.innerHeight / 2) - (height / 2);

  return {top, left};
}

/* istanbul ignore next */
function getPopupSize(provider) {
  switch (provider) {
    case "nyfix":
      return {width: 580, height: 400};

    case "facebook":
      return {width: 580, height: 400};

    case "google":
      return {width: 452, height: 633};

    case "github":
      return {width: 1020, height: 618};

    case "linkedin":
      return {width: 527, height: 582};

    case "twitter":
      return {width: 495, height: 645};

    case "live":
      return {width: 500, height: 560};

    case "yahoo":
      return {width: 559, height: 519};

    default:
      return {width: 1020, height: 618};
  }
}

/* istanbul ignore next */
function getPopupDimensions(provider) {
  let {width, height} = getPopupSize(provider);
  let {top, left} = getPopupOffset({width, height});

  return `width=${width},height=${height},top=${top},left=${left}`;
}

function repeatObs() {
  return Observable.defer(() => {
    var sub = new Subject()
    var trigger = () => setTimeout(() => sub.next(), 0)
    trigger()
    return sub.asObservable().do(trigger)
  });
}

export default function openPopup(provider, url, name) {
  return Observable.defer(() => {
    let popup = window.open(url, name, `${settings},${getPopupDimensions(provider)}`);
    return repeatObs()
      .concatMap(() => {
        if (popup.closed)
          return Observable.throw('Popup was closed')
        var copy
        try {
          copy = Object.assign({}, popup.location);
        } catch (err) {}
        return copy ? Observable.of(copy) : []
      })
      .distinctUntilKeyChanged('href')
      .finally(() => popup.closed || popup.close())
  });
}
