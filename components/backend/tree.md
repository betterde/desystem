## Tree
## 安装配置
### 声明并安装依赖
```php
composer require betterde/tree
```
## 使用
### 实例化
```php
use Betterde\Tree\Generator;
class TestController extends Controller
{
    public function index()
    {
        $generator = new Generator();
    }
}
```
### 查询
```php
/**
 * 查询
 *
 * $collection 数据
 * $code 主键名称
 * $parent_code 父键名称
 * $children 子键名称
 * $topvalue
 */
$tree = $generator->make($collection, 'code', 'parent_code', 'children', '');
```
