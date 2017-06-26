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

var backend_port  = process.env.BACKEND_PORT  || 3000;
var frontend_port = process.env.FRONTEND_PORT || 8080;
var hostname      = process.env.HOSTNAME      || 'localhost';

module.exports = {
  backend: {
    port: backend_port,
    path: 'http://' + hostname + ':' + backend_port + '/'
  },
  frontend: {
    port: frontend_port,
    path: 'http://' + hostname + ':' + frontend_port + '/'
  },
}
