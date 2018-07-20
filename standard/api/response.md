# 资源响应

## 响应体格式如下

```json
{
    "status": 200,
    "message": "请求成功",
    "data": [],
    "current_page": 1,
    "from": 1,
    "per_page": 15,
    "to": 15,
    "last_page": 7,
    "total": 100
}
```
#### 必含参数：

* status：表示响应`状态码`;
* message：后端响应信息，用于错误提示;
* data：请求成功后返回的资源数据，返回`单个对象`或`资源对象的集合`;

#### 当请求分页数据时才会有如下响应参数：

* current_page：当前页码；
* from：当前页的第一条数据的索引，值为：`(当前页码 - 1) x 分页大小 + 1`；
* per_page：分页大小；
* to：当前页的最后一条数据的索引, 值为：`当前页码 x 分页大小`；
* last_page：最后一页的页码，值为：`总数量/分页大小`，除不尽则为整数加一；
* total：总数量.

## 响应扩展包

采用HTTP统一[状态码](./status.md)进行描述。<Badge text="MUST" type="tip" vertical="middle"/>

::: tip 提示
可以使用[Response](https://packagist.org/packages/betterde/response)扩展包开发您的定义一的响应体
:::

```bash
# 安装依赖
composer require betterde/response
```
