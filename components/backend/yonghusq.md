# 用户授权扩展包
## 安装配置
### 声明并安装依赖
```php
composer require betterde/authorization
```
> 该扩展包依赖于 `betterde/role` 和 `betterde/perission`！

### 发布扩展包资源和配置文件到项目
```php
php artisan vendor:publish --tag=role
php artisan vendor:publish --tag=permission
php artisan vendor:publish --tag=authorization
```
> 执行完成后 `config` 会生成 `role.php` 、 `permission.php` 和 `authorization.php` 配置文件，同时 `database/migration` 目录下回生成对应的数据库迁移文件。

### 执行迁移
```php
php artisan migrate
```
> 在 `config/database.php` 配置文件 `redis` 数组中加入如下配置，因为框架使用默认的数据库是0，这样所有的缓存、session 等数据都在 默认的 0 数据库中！为了避免数据跟其他服务数据混合，所以建议自定义 `cache` 的数据库！
```php
'cache' => [
	'host' => env('REDIS_HOST', '127.0.0.1'),
	'password' => env('REDIS_PASSWORD', null),
	'port' => env('REDIS_PORT', 6379),
	'database' => 1,
],
```

### 创建角色
```php
php artisan role:create CODE NAME GUARD
```
> 参数说明请看 `betterde/role` 的 `README` 文档

### 手动控制缓存
```php
php artisan role:cache
php artisan role:flush
php artisan permission:cache
php artisan permission:flush
```

## 使用

1、首先要让你的用户模型继承 `Betterde\Authorization\Authorization.php` 这个类（你可以重写里面的方法，实现自己的逻辑，或者干脆自己实现一个 `Betterde\Authorization\Contracts\AuthorizationContract.php` 契约）。
然后就可以使用如下方法进行鉴权了：
```php
/**
* @var User $user
*/
$user = Auth::user();
// 验证用户是否拥有某个角色
$user->hasRole('admin');
// 验证用户是否拥有某项权限
$user->hasPermission('update-article');
```

> 注意，`$user = Auth::user();`上面的变量注释是为了获取User模型下定义方法的代码提示，可以不加注释！

### E.g.

定义测试路由：`result` 的值将为 `false`

```php
Route::get('test', function () {
    $user = new AppModelsUser();
    $user->name = 'George';
    $result = $user->hasRole('admin');
    return response()->json(['result' => $result]);
});
```
