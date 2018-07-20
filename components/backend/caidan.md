# 菜单

## 安装配置
### 声明并安装依赖
```php
composer require keling/menu
```
### 文件迁移
```php
php artisan vendor:publish --provider="Keling\Menu\MenuServiceProvider"
```
### 数据库迁移
```php
php artisan migrate
```
### 更新composer
```php
composer dump-autoload
```
### 数据填充
```php
php artisan db:seed --class=MenusTableSeeder
```
### 配置
```php
config/menu.php
'Redis' => true // true 开始redis缓存  false 开启
```

## 使用
### 实例化
```php
use Keling\Menu\Repositories\MenuRepository;
class TestController extends Controller
{
    public function index()
    {
        $menuRepository = new menuRepository();
    }
}
```
### 查询全部菜单
```php
/**
 * 查询全部菜单
 * kile 菜单名称
 * is 1 返回一维菜单 其余返回递归菜单
 */
$data = $menuRepository->all();
```

### 添加
```php
$data = $menuRepository->create('菜单', '1', '1');
```
### 查询
```php
$data = $menuRepository->show(1);
```
### 修改
```php
$data = $menuRepository->store(['id' => 1], ['name' => '修改']);
```
### 删除
```php
$data = $menuRepository->destroy(1);
```
