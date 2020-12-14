const proxy = require('@webserverless/fc-express')
const getRawBody = require('raw-body');
const app = require('./utils/routes');

const server = new proxy.Server(app);

const init = async () => {
	console.log('可以做一些处理');
}

module.exports.handler = async (req, res, context) => {
  req.body = await getRawBody(req);
  await init();
  server.httpProxy(req, res, context);
};