# 任务队列

## 守护进程管理

### 安装Supervisor

```bash
yum install supervisor -y
```

### 生成配置文件

```bash
echo_supervisord_conf > /etc/supervisord.conf

vim /etc/supervisord.conf

#如果要开启Web管理，需要取消注释，并将port=127.0.0.1 改为*
[inet_http_server]
port=*:9001
username=USERNAME
password=PASSWORD
```

* `USERNAME`：登录的用户名
* `PASSWORD`：登录的密码

::: tip 开放端口
如果是阿里云的服务器，需要添加安全策略，允许访问`9001`端口
:::

### 启动服务

```bash
supervisord -c /etc/supervisord.conf
```

### 添加配置文件

将配置文件写入`/etc/supervisord/`文件夹，并且以`.ini`为后缀。

```
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php PROJECT_PATH/artisan queue:work  --timeout=300
autostart=true
autorestart=true
user=USERNAME
numprocs=8
redirect_stderr=true
stdout_logfile=PROJECT_LOG_PATH
```
* `PROJECT_PATH`：项目目录
* `PROJECT_LOG_PATH`：项目日志目录
* `program:laravel-worker`：中的`laravel-worker`可以自定义名称，如果一个服务器上有多个守护进程，那么建议使用项目名称作为该名称！
* `--timeout=300`：设置任务超时时间，如果任务执行时间很长，那么需要将该时间设置的大一些，以免重复执行同一条任务！

### 读取配置文件

```bash
supervisorctl reread
supervisorctl update
```
