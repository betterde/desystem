# 查询设计

## 按需查询数据

应尽量避免 `SELECT *`，因为并不是所有字段都会使用到，而且对于列比较多，且数据量比较大的表来说，这非常耗费系统资源。

## 隐式类型转换

假设`users`表中的`mobile`字段有索引，并且数据类型是`char`，那么查询时应该也是字符串类型。否则将导致遍历全表，而不能命中索引。
```php
# Bad
DB::table('users')->where('mobile', 18616882860)->first();

# Good
DB::table('users')->where('mobile', '18616882860')->first();
```

## 函数或表达式

同样的，不要才SQL中执行逻辑，应在代码层执行，并取得最终结果，再执行SQL查询。这样可以提高索引的命中率！

## 模糊查询

对于某些多表关联的场景，尽量不要使用模糊查询关联表字段，而应分开查询，如：项目关联公司，要实现按公司查询，可以分开进行查询。也就是先模糊查询公司，获取ID后，再根据公司ID作为查询条件查询项目数据！

## 负向查询

负向查询条件：`NOT`、`!=`、`<>`、`!<`、`!>`、`NOT IN`、`NOT LIKE`等，会导致全表扫描。

## 慢查询日志

### 命令行方式

```bash
mysql> show variables like 'slow_query%';
+---------------------+--------------------------------------+
| Variable_name       | Value                                |
+---------------------+--------------------------------------+
| slow_query_log      | OFF                                  |
| slow_query_log_file | /usr/local/var/mysql/George-slow.log |
+---------------------+--------------------------------------+

mysql> show variables like 'long_query_time';
+-----------------+-----------+
| Variable_name   | Value     |
+-----------------+-----------+
| long_query_time | 10.000000 |
+-----------------+-----------+

# 开启慢查询日志
mysql> set global slow_query_log='ON';

# 设置日志存储目录
mysql> set global slow_query_log_file='/usr/local/mysql/data/slow.log';

# 设置慢查询时间，单位：秒
mysql> set global long_query_time=1;
```

### 配置文件模式

```
[mysqld]
slow_query_log = ON
slow_query_log_file = /usr/local/mysql/data/slow.log
long_query_time = 1
```

### 重启服务
```bash
service mysqld restart
```

## 开启性能监控

虽然这回消耗一部分性能，但是将有利于定位问题发现性能瓶颈，从而提升整体性能几倍乃至几十倍。
