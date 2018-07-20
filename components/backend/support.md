# 基础扩展

## 安装配置
### 声明并安装依赖
```php
composer require betterde/support
```
## 使用
### 获取给定日期范围内的所有日期
```php
Day::all('2018-05-08', '2018-05-10', false);

// Result

{
    "days": 3,
    "collection": [
        "2018-05-08",
        "2018-05-09",
        "2018-05-10"
    ]
}
```
### 获取当前月的每一天
```php
Day::month();

// Result

{
    "days": 30,
    "collection": [
        "2018-06-01",
        "2018-06-02",
        "2018-06-03",
        "2018-06-04",
        "2018-06-05",
        "..."
    ]
}
```
### 获取给定日期的和周的拼接字符串
```php
Day::toWeek("2018-06-18");

// Result
06月18日 周一
```

### 获取给定日期周
```php
Day::getWeekDays("2018-06-18", 1);

// Result
[
    "start" => "2018-06-18",
    "end" => "2018-06-24"
]
```
### 获取指定日期的月初和月末
```php
Day::getMonthStartAndEnd("2018-06-18");

// Result
[
    "start" => "2018-06-01",
    "end" => "2018-06-29"
]
```
### 获取月初时间
```php
/**
 * 获取月初时间
 *
 * Date: 09/05/2018
 * @author George
 * @param bool $date
 * @param bool $datetime
 * @return false|string
 */
public static function firstDayOfMonth($date = false, $datetime = false)
{
    if ($date) {
        $month = substr($date, 0, 7);
        $firstDay = $month . '-01';
    } else {
        $firstDay = date('Y-m-01');
    }

    if ($datetime) {
        $firstDay = $firstDay . ' ' . '00:00:01';
    }

    return $firstDay;
}
```
### 获取月初时间
```php
/**
 * 获取月末时间
 *
 * @param bool $date
 * @param bool $datetime
 * @return false|string
 */
public static function lastDayOfMonth($date = false, $datetime = false)
{
    if ($date) {
        $month = substr($date, 0, 7);
        $lastDay = date($month . '-t');
    } else {
        $lastDay = date('Y-m-t');
    }

    if ($datetime) {
        $lastDay = $lastDay . ' ' . '23:59:59';
    }

    return $lastDay;
}
```
