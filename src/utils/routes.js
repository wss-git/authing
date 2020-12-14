const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const utils = require('./utils');
const stage = utils.oidcConfig.Stage;

const app = express();

app.use(cookieParser());

app.all('*', function(req, res, next) {
  const { headers, query } = req;
  for (const key in headers) {
    var value = headers[key];
    res.setHeader(key, value);
  }
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.get('/', login);
app.get(`/${stage}/login?/`, login);
function login(req, res) {
  const { headers } = req;
  const redirect_uri = utils.generateLoginUri(headers.host);
  res.redirect(redirect_uri);
}

app.get(`/${stage}/index?/`, index)
async function index(req, res) {
  const access_token = req.cookies['token'];
  const toLogin = () => {
    const redirect_uri = utils.generateLoginUri(req.headers.host);
    res.redirect(redirect_uri);
  }
  if (access_token == undefined) {
    return toLogin();
  }

  try {
    const { data } = await axios.get(`https://oauth.authing.cn/oauth/oidc/validate_access_token?access_token=${access_token}`);
    if (data.message) {
      return toLogin();
    }
    res.send('hello world!');
  } catch (error) {
    res.status(401).send(error.message);
  }
}

app.get(`/${stage}/code-exchange-token?/`, async (req, res) => {
  const { headers, query } = req;

  if (!query.code) {
    res.send(JSON.stringify({ query: '', headers: headers }, null, '    '));
  } else {
    const token = await utils.codeExchangeToken(query.code, headers.host);
    if (token && token.access_token) {
      res.setHeader('Content-Type', headers['Content-Type'] || 'text/plain');
      res.setHeader('Set-Cookie', utils.genCookie('token', token.access_token));
      res.redirect(`/${stage}/index`);
    } else {
      token.code = query.code;
      token.host = headers.host;
      res.send(JSON.stringify(token, null, '    '));
    }
  }
});

module.exports = app;
