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
