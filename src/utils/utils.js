
const path = require('path');
const fs = require('fs');

const yaml = require('js-yaml');
const axios = require("axios");
const qs = require("qs");

const authingConfig = yaml.load(fs.readFileSync(path.resolve(__dirname, '../authing.yml')))

const oidcConfig = authingConfig.oidc;
oidcConfig.Stage = oidcConfig.Stage || 'release';

const genRedirectUri = (
  host,
  callbackRoute = 'code2token',
  protocol = 'http'
) => `${protocol}://${host}/${oidcConfig.Stage}/${callbackRoute}/`;
const genCookie = (
  key,
  value = "",
  max_age = "",
  path = "/",
  domain = ""
) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  return `${key}=${value};path=${path};${
    max_age === '' ? '' : 'max_age=' + max_age + ';'
  }${domain === '' ? '' : 'domain' + domain + ';'}`;
}

// 用code换取token信息
async function code2Token(code, host) {
  let code2tokenResponse;
  let data = {};
  try {
    data = qs.stringify({
      code: code,
      client_id: oidcConfig.client_id,
      client_secret: oidcConfig.client_secret,
      grant_type: oidcConfig.grant_type,
      redirect_uri: genRedirectUri(host)
    });
    code2tokenResponse = await axios.post(
      "https://oauth.authing.cn/oauth/oidc/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return code2tokenResponse.data;
  } catch (error) {
    return { error: error, params: data };
  }
}

function generateLoginUri(host) {
  const serverlessConstructorParams = {
    client_id: oidcConfig.client_id,
    scope: oidcConfig.scope,
    response_type: oidcConfig.response_type,
    prompt: oidcConfig.prompt,
    redirect_uri: genRedirectUri(host)
  };

  let urlPostFix = "";
  for (const key in serverlessConstructorParams) {
    urlPostFix += `${key}=${serverlessConstructorParams[key]}&`;
  }
  return `https://${oidcConfig.domain}/oauth/oidc/auth?${urlPostFix}`;
}

module.exports = {
  oidcConfig,
  generateLoginUri,
  genCookie,
  code2Token
}