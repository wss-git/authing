### Authing

authing.yml 文件

````
oidc: 
  client_id: {App ID}
  client_secret: {App Secret}
  Stage: release
  domain: *******.authing.cn
  scope: openid profile email phone offline_access
  grant_type: authorization_code
  prompt: login
  response_type: code
````