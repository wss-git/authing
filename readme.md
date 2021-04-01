## 应用使用

### 准备阶段

#### 安装 Node.js

- 根据您的系统环境安装 [Node](https://nodejs.org/zh-cn/download/)。
- 安装完毕后，通过 node -v 命令，查看安装好的 Node.js 版本信息【8.x 以上的版本】：
````
$ node -v
vx.x.x
````

#### 安装 Serverless Devs

- 在命令行中运行命令：
````
$ npm install @serverless-devs/s -g
````
> 查看更多[详细信息](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/readme_zh.md#%E5%BF%AB%E5%85%A5%E5%AE%89%E8%A3%85%E5%92%8C%E4%BD%BF%E7%94%A8)

- 安装执行完毕，可以通过 s -v 查看 Serverless Devs 版本。
````
$ s -v

Serverless Tool Version: *.*.*
````

#### Authing
1. 注册或者登陆 [Authing](https://console.authing.cn/login)
2. 根据提示依次创建用户池、应用，进入应用并查看应用配置
3. 在应用配置中获取：App ID、App Secret 和认证地址
4. 在此应用下新建一个用户

### 创建应用

#### 初始化应用
- 在命令行执行命令
> $ s init authing && cd authing

#### 修改配置
- 编辑 template.yaml
> 查看更多[配置信息](https://github.com/Serverless-Devs-Awesome/fc-alibaba-component/blob/master/readme_zh.md#%E5%8F%82%E6%95%B0%E8%AF%A6%E6%83%85)

- 编辑**authing.yml**

````
oidc: 
  client_id: 应用 id
  client_secret: 应用 secret
  Stage: release
  domain: 应用认证地址
  scope: openid profile email phone offline_access
  grant_type: authorization_code
  prompt: login
  response_type: code
````

#### 部署函数
- 在命令行执行命令
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

#### 配置登录回调 URL

- 打开 Authing 当前应用的应用配置
- 获取应用的 Url， 如上面示例的 Url 为 http://37679582-********.test.functioncompute.com
- 登录回调 URL 配置：http://37679582-********.test.functioncompute.com/release/code-exchange-token/

#### 访问 index

浏览器输入 http://37679582-********.test.functioncompute.com/release/index
