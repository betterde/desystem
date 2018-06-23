# 介绍

Web从最初其设计者所构思的主要支持静态文档的阶段，逐渐变得越来越动态化。Web应用的交互模式，变得越来越复杂。为了方便前后端对接，降低沟通成本。特制定该规范，请尽可能的按照规范实施。

## 协议 <Badge text="RECOMMENDED" type="tip" vertical="middle"/>

为确保前后端数据通信的安全性，使用HTTPS协议进行加密传输

## 资源

资源是一种看待服务器的方式，即，将服务器看作是由很多离散的资源组成。每个资源是服务器上一个可命名的抽象概念。因为资源是一个抽象的概念，所以它不仅仅能代表服务器文件系统中的一个文件、数据库中的一张表等等具体的东西，可以将资源设计的要多抽象有多抽象，只要想象力允许而且客户端应用开发者能够理解。与面向对象设计类似，资源是以名词为核心来组织的，首先关注的是名词。一个资源可以由一个或多个URI来标识。URI既是资源的名称，也是资源在Web上的地址。对某个资源感兴趣的客户端应用，可以通过资源的URI与其进行交互。

## 资源的表述

资源的表述是一段对于资源在某个特定时刻的状态的描述。可以在客户端-服务器端之间转移（交换）。资源的表述可以有多种格式，例如HTML/XML/JSON/纯文本/图片/视频/音频等等。资源的表述格式可以通过协商机制来确定。请求-响应方向的表述通常使用不同的格式。

## 无状态

通信的会话状态（Session State）应该全部由客户端负责维护。

## 统一接口

REST要求，必须通过统一的接口来对资源执行各种操作。对于每个资源只能执行一组有限的操作。以HTTP/1.1协议为例，HTTP/1.1协议定义了一个操作资源的统一接口，主要包括以下内容：

* 7个HTTP方法：GET/POST/PUT/DELETE/PATCH/HEAD/OPTIONS
* HTTP头信息（可自定义）
* HTTP响应状态代码
* 套标准的内容协商机制
* 套标准的缓存机制
* 套标准的客户端身份认证机制

REST还要求，对于资源执行的操作，其操作语义必须由HTTP消息体之前的部分完全表达，不能将操作语义封装在HTTP消息体内部。这样做是为了提高交互的可见性，以便于通信链的中间组件实现缓存、安全审计等等功能。

## RESTful

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

## 域名与版本控制 <Badge text="RECOMMENDED" type="tip" vertical="middle"/>

使用API专有域名，并对API进行版本控制：
```
https://api.betterde.com/v{n}/
```

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
# Bad
Route::get('v1/user/profile', 'ProfileController');
Route::post('v1/user/profile', 'ProfileController');
Route::get('v1/user/profile/{profile}', 'ProfileController');
Route::patch('v1/user/profile/{profile}', 'ProfileController');
Route::delete('v1/user/profile/{profile}', 'ProfileController');

# Good
Route::group(['prefix' => 'v1'], function () {
    Route::group(['prefix' => 'user'], function () {
        Route::apiResource('profile', 'ProfileController');
    });
});

# 生成路由如下
GET|HEAD    api/v1/user/profile
POST        api/v1/user/profile
GET|HEAD    api/v1/user/profile/{profile}
PUT|PATCH   api/v1/user/profile/{profile}
DELETE      api/v1/user/profile/{profile}
```

## 过滤资源与分页

查询过滤统一采用`查询字符串`（QueryString）传递过滤参数：

```
https://api.betterde.com/v1/user?age=18&page=10&paginate=15
```
::: tip 查询参数说明
在`URL`中`?`及以后的字符串都被称为查询字符串。请尽量采用如下分页参数（[OPTIONAL](../common/keyword.md#optional)）
* `page` 用于分页的页码
* `paginate` 用于定义分页大小
:::
