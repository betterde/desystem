---
sidebar: auto
---

# 介绍

为了方便前后端对接，降低沟通成本。特制定该规范，望各位尽可能的按照规范实施。

## 协议

为确保前后端数据通信的安全性，[RECOMMENDED](../common/keyword.md#recommended)使用HTTPS协议进行加密传输

## 域名与版本控制

[RECOMMENDED](../common/keyword.md#recommended)使用API专有域名，并对API进行版本控制：
```
https://api.betterde.com/v{n}/
```

## RPC

RPC(Remote Procedure Call) 意为`远程过程调用`，它是一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。

### SOPA

SOAP (Simple Object Access Protocol)，是一个严格定义的信息交换协议，用于在Web Service中把远程调用和返回封装成机器可读的格式化数据。事实上SOAP数据使用XML数据格式，定义了一整套复杂的标签，以描述调用的远程过程、参数、返回值和出错信息等等。而且随着需要的增长，又不得增加协议以支持安全性，这使SOAP变得异常庞大，背离了简单的初衷。

### RESTful

REST (Representational State Transfer) 意为`表现层状态转化`，采用 Web 服务使用标准的 HTTP 方法：
* GET：请求服务器取出一个或多个资源;
* POST：请求服务器创建一个或多个资源;
* PATCH：请求服务器更新资源（客户端提供改变后的部分资源属性）;
* PUT：请求服务器更新资源（客户端提供改变后的完整资源属性）;
* DELETE：请求服务器删除指定的资源;
* OPTIONS：允许客户端查看服务器的信息，通常会在跨域请求中看到该请求方法;
* HEAD：类似于GET请求，只不过返回的响应中没有具体的内容，用于获取报头。

::: tip 提示
关于什么时候用`PUT`,什么时候用`PATCH`？如果你要更新资源部分属性的话，那么就用`PATCH`，如果是更新全部属性，那么就用`PUT`，在`Laravel路由`中定义更新资源对象的方法是 `PUT`|`PATCH` 并存的！
:::

## 合理的路由分割

### 不要采用驼峰式路由

```
# Bad
https://api.betterde.com/v1/getUserProfile

# Good
https://api.betterde.com/v1/user/profile
```

### 路由按模块进行分组

```php
Route::group(['prefix' => 'v1'], function () {
    Route::group(['prefix' => 'user'], function () {
        Route::apiResource('profile', 'ProfileController');
    });
});

#生成路由如下
GET|HEAD    api/v1/user/profile
POST        api/v1/user/profile
GET|HEAD    api/v1/user/profile/{profile}
PUT|PATCH   api/v1/user/profile/{profile}
DELETE      api/v1/user/profile/{profile}
```

## 过滤资源

查询过滤统一采用`查询字符串`传递过滤参数：

```
https://api.betterde.com/v1/user?age=18&page=10&paginate=15
```
::: tip 查询参数说明
在`URL`中`?`及以后的字符串都被成为查询字符串，请尽量采用如下分页参数（[OPTIONAL](../common/keyword.md#optional)）
* `page` 用于分页的页码
* `paginate` 用于定义分页大小
:::


## 资源响应

### 响应体格式如下

```json
{
    "status": 200,
    "message": "请求成功",
    "data": []
}
```
* status：表示响应`状态码`;
* message：后端响应信息，用于错误提示;
* data：请求成功后返回的资源数据，如果请求的是单个资源则返回的是`单个对象`，如果请求的是资源集合，则返回`资源对象的集合`;

### 状态码

[MUST](../common/keyword.md#must) 采用HTTP 统一状态码进行描述，[MUST NOT](../common/keyword.md#must-not)自定义响应状态码。

::: tip 提示
可以使用[Response](https://packagist.org/packages/betterde/response)扩展包开发您的定义一的响应体
:::

```bash
# 安装依赖
composer require betterde/response
```
