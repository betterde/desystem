## City
## 安装配置
### 声明并安装依赖
```php
composer require keling/city
```
### 文件迁移
```php
php artisan vendor:publish --provider="Keling\City\CityServiceProvider"
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
# /vendor/keling/city/tr_area
根目录的 tr_area 文件是sql语句,复制到命令行写入
```

### 配置
```php
// /config/city.php
'Redis' => true // true 开始redis缓存  false 开启
```

## 使用
### 实例化
```php
use Keling\City\Repositories\CityRepository;
class TestController extends Controller
{
    public function index()
    {
        $CityRepository = new CityRepository();
    }
}
```
### 查询
```php
/**
 * 城市查询
 *
 * @param $level 层级 1省 2市 3区县
 * @param int $pid 父id
 * @return array
 */
$data = $CityRepository->allCitys(3, 20);
```
