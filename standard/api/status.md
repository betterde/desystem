# 状态码

HTTP状态码（HTTP Status Code）是用以表示网页服务器HTTP响应状态的3位数字代码。下面定义了开发中最常用到的状态码：

## 请求成功

### 200

请求成功

### 201

资源被创建

### 202

请求被放入任务队列，等待处理

## 用户端错误

### 400

用户端通用错误

### 401

用户认证失败

### 403

无权访问

### 404

资源不存在

### 422

请求参数有误

### 429

请求次数过多

## 服务器端错误

### 500

服务端错误

### 503

服务不可用，与`500`的区别就是`503`是代表整个API服务不可用，而`500`多数是某个独立API的Bug

::: tip 更多状态码请参见MDN文档
[HTTP Response Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
:::
