# API响应

## 安装

```bash
composer require betterde/response
```

## 使用说明

### 请求成功

`$data`可以是单个资源也可以是多个资源组成的集合

```php
return success($data);
```

### 创建成功

`message` 的默认值为`创建成功`，如果无需自定义的话可以不传！

```php
return stored($data, $message = '创建成功');
```

### 更新成功

```php
return updated($data, $message = '更新成功');
```

### 删除成功

删除成功是无需返回数据的，只要有消息和状态码即可，如果一定要返回额外的参数，请使用`success`或`respond`方法。

```php
return deleted($message = '删除成功');
```

### 请求已受理

如果后台处理的是异步任务，那么则使用该方法进行响应。

```php
return accepted($message = '请求已接受，等待处理');
```

### 资源不存在

当访问的资源不存在时，使用该方法进行响应

```php
return notFound($message = '您访问的资源不存在');
```

### 服务端错误

```php
return internalError($message = '未知错误导致请求失败');
```

### 普通错误

`code`默认是`400`，可以自定义，请参照[状态码](../../standard/api/status.md)

```php
return failed($message, $code = Response::HTTP_BAD_REQUEST);
```

### 返回消息

`code`默认是`200`，可以自定义，请参照[状态码](../../standard/api/status.md)

```php
return message($message, $code = Response::HTTP_OK);
```

### 自定义响应

```php
return respond($data = [], $message = '请求成功', array $header = []);
```
