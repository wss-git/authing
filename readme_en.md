## Document

### Preparation

#### Install Node.js

- Install according to your system environment [Node](https://nodejs.org/zh-cn/download/)。
- After the installation, check the installed one through the node -v command Node.js Version information [version above 8.X]：
````
$ node -v
vx.x.x
````

#### Install Serverless Devs

- Running commands on the command line：
````
$ npm install @serverless-devs/s -g
````
> More information [Detail information](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/readme_zh.md#%E5%BF%AB%E5%85%A5%E5%AE%89%E8%A3%85%E5%92%8C%E4%BD%BF%E7%94%A8)

- After the installation, you can view the version of Serverless Devs through s -v.
````
$ s -v

Serverless Tool Version: *.*.*
````

#### Authing
1. Register or log in [Authing](https://console.authing.cn/login)
2. According to the prompt, create user pool and application, enter the application and view the application configuration
3. Obtain: app ID, APP secret and authentication address in application configuration
4. Create a new user under this application

### Create application

#### Init application
- Execute a command on the command line
> $ s init authing && cd authing

#### Change config
- Edit template.yaml
> See more[Config information](https://github.com/Serverless-Devs-Awesome/fc-alibaba-component/blob/master/readme_zh.md#%E5%8F%82%E6%95%B0%E8%AF%A6%E6%83%85)

- Edit**authing.yml**

````
oidc: 
  client_id: app id
  client_secret: app secret
  Stage: release
  domain: app url
  scope: openid profile email phone offline_access
  grant_type: authorization_code
  prompt: login
  response_type: code
````

#### Deploy function
- Execute a command on the command line
````
$ s deploy

# 输出信息
Start ...
It is detected that your project has the following project/projects < AuthingDemo > to be execute
Start executing project AuthingDemo


  You can configure the specified key in yaml. For example:

  AuthingDemo
    Component: fc
    Provider: alibaba
    Access: Fill in the specified key here

Start the pre-hook
[Hook / Plugin] npm install --production
Executing ...
Execute:
npm WARN authing@0.0.1 No repository field.
npm WARN authing@0.0.1 No license field.


End the pre-hook
Waiting for service Authing to be deployed...
Service Authing deploy success

Waiting for function Authing to be deployed...
Packing ...
file .s is ignored.
Package complete.
Function: Authing@Authing updating ...
Deploy function Authing successfully
function Authing deploy success

Trigger: Authing@AuthingTriggerNameHttp deploying ...
This domain name is a temporary domain name. It is only used as a learning test and cannot be used in production environment.
        TriggerName: TriggerNameHttp
        Methods: GET,POST,PUT
        Url: 37679582-********.test.functioncompute.com
        EndPoint: https://********.cn-shenzhen.fc.aliyuncs.com/2016-08-15/proxy/Authing/Authing/
Trigger: Authing@Authing-TriggerNameHttp deploy successfully
Start deploying domains ...
This domain name is a temporary domain name. It is only used as a learning test and cannot be used in production environment.
Project AuthingDemo successfully to execute 

AuthingDemo:
  Service: Authing
  Function: Authing
  Triggers:
    - Name: TriggerNameHttp
      Type: HTTP
      Domains:
        - 37679582-********.test.functioncompute.com 
````

#### Configure login callback URL

- Open the application configuration of the current application of authoring
- Get the URL of the application. For example, the URL of the above example is http://37679582-********.test.functioncompute.com
- Login callback URL configuration：http://37679582-********.test.functioncompute.com/release/code-exchange-token/

#### Visit index

Browser input http://37679582-********.test.functioncompute.com/release/index