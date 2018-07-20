# 极光推送

![Flow](/jpush-bind-flow.png)

## 名词解释

### Registration ID

客户端初始化 JPush 成功后，JPush 服务端会分配一个 Registration ID，作为此设备的标识（同一个手机不同 APP 的 Registration ID 是不同的）。开发者可以通过指定具体的 Registration ID 来进行对单一设备的推送。

### Tag

为安装了应用程序的用户打上标签，其目的主要是方便开发者根据标签，来批量下发 Push 消息。 可为每个用户打多个标签！

### Alias

每个用户只能指定一个别名。 同一个应用程序内，对不同的用户，建议取不同的别名。这样，尽可能根据别名来唯一确定用户。

::: tip 场景说明
例如一个用户A属于B公司的C项目，因为一个人同一时间段内只能属于一个公司，那么可以将用户的Alias设置为公司COMPANY_ID。而一个人可能属于多个项目，那么每个项目需要给人员绑定一个TAG，如：PROJECT_ID。Registration ID 是App端生成的，提交给后端以后，后端通过Registration ID 与实际业务逻辑进行绑定。比如：当用户从一个项目转移到另一个项目，那么，需要将Registration ID与原先项目的Tag解绑，并绑定到新的项目Tag！
:::

## 安装

### 声明并安装依赖

```bash
composer require betterde/laravel-jpush
```

### 发布配置文件

```bash
php artisan vendor:publish --tag=jpush-config
```

配置内容如下：

```php
return [
    'key' => env('JPUSH_APP_KEY'),
    'secret' => env('JPUSH_MASTER_SECRET'),
    'path' => storage_path('logs/push.log'),
    'apns_production' => env('JPUSH_APNS_ENV'),
    'retry_time' => 3,
    'ios' => [
        'sound' => 'default', //表示通知提示声音，默认填充为空字符串
        'badge' => '+1', //表示应用角标，把角标数字改为指定的数字；为 0 表示清除，支持 '+1','-1' 这样的字符串，表示在原有的 badge 基础上进行增减，默认填充为 '+1'
        'content-available' => true, //表示推送唤醒，仅接受 true 表示为 Background Remote Notification，若不填默认表示普通的 Remote Notification
        "mutable-content" => true, //表示通知扩展, 仅接受 true 表示支持 iOS10 的 UNNotificationServiceExtension, 若不填默认表示普通的 Remote Notification
        'category' => 'attendance', //IOS8才支持。设置 APNs payload 中的 'category' 字段值
        'extras' => []
    ],
    'android' => [
        'title' => '', //表示通知标题，会替换通知里原来展示 App 名称的地方
        'builder_id' => 2, //表示通知栏样式 ID
        "priority" => 0, // 表示通知栏展示优先级，默认为 0，范围为 -2～2 ，其他值将会被忽略而采用默认值
        'extras' => [] //表示扩展字段，接受一个数组，自定义 Key/value 信息以供业务使用
    ],
    // 定时通知配置
    'remind' => [
        'database' => 'remind',
        'schedule' => [
            'prefix' => 'schedule',
        ],
        // 提前提醒时间，单位：秒
        'advance' => 300
    ]
];
```

## 使用

```php
Push::device(); //调用设备管理接口
Push::push(); //调用推送接口
Push::report(); //调用报表接口
Push::schedule(); //调用定时任务接口
```

### 定时推送

因为极光官方的定时任务最大只支持100个，在实际项目中很难满足需求（如果你的定时推送精确到分钟级别的话）。因此需要本地实现一套定时推送逻辑。

```bash
php artisan vendor:publish --tag=jpush-jobs
```

在`App\Console\Kernel`中添加如下代码：

```php
use App\JobsSchedule\Handler;
use App\JobsSchedule\Generator;

protected function schedule(Schedule $schedule)
{
    $schedule->job(new ScheduleGenerator)->dailyAt('23:00');
    $schedule->job(new ScheduleHandler('Remind Title', 'Alert content', []))->everyMinute();
}
```
::: tip 温馨提示
请根据你实际项目中的业务逻辑修改执行时间和频率，守护进程管理请参阅[任务队列](./supervisor.md)。
:::
