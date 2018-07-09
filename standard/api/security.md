# 安全防范

## HTTPS

### SSL
Secure Socket Layer 安全套接字层为，Netscape所研发，用以保障在Internet上数据传输之安全，利用数据加密(Encryption)技术，可确保数据在网络上之传输过程中不会被截取。它已被广泛地用于Web浏览器与服务器之间的身份认证和加密数据传输。
SSL协议位于TCP/IP协议与各种应用层协议之间，为数据通讯提供安全支持。SSL协议可分为两层：

* SSL记录协议（SSL Record Protocol）：

    它建立在可靠的传输协议（如TCP）之上，为高层协议提供数据封装、压缩、加密等基本功能的支持。

* SSL握手协议（SSL Handshake Protocol）：

    它建立在SSL记录协议之上，用于在实际的数据传输开始前，通讯双方进行身份认证、协商加密算法、交换加密密钥等。

### TLS
Transport Layer Security 传输层安全协议，用于两个应用程序之间提供保密性和数据完整性。
TLS 1.0是IETF（Internet Engineering Task Force，Internet工程任务组）制定的一种新的协议，它建立在SSL 3.0协议规范之上，是SSL 3.0的后续版本，可以理解为SSL 3.1，它是写入了 RFC 的。
该协议由两层组成：TLS 记录协议（TLS Record）和 TLS 握手协议（TLS Handshake）。较低的层为 TLS 记录协议，位于某个可靠的传输协议（例如 TCP）上面。

### 主要功能

* 认证用户和服务器，确保数据发送到正确的客户机和服务器；
* 加密数据以防止数据中途被窃取；
* 维护数据的完整性，确保数据在传输过程中不被改变。

### TLS与SSL的差异

* 版本号：TLS记录格式与SSL记录格式相同，但版本号的值不同，TLS的版本1.0使用的版本号为SSLv3.1；
* 报文鉴别码：SSLv3.0和TLS的MAC算法及MAC计算的范围不同。TLS使用了RFC-2104定义的HMAC算法。SSLv3.0使用了相似的算法，两者差别在于SSLv3.0中，填充字节与密钥之间采用的是连接运算，而HMAC算法采用的是异或运算。但是两者的安全程度是相同的；
* 伪随机函数：TLS使用了称为PRF的伪随机函数来将密钥扩展成数据块，是更安全的方式；
* 报警代码：TLS支持几乎所有的SSLv3.0报警代码，而且TLS还补充定义了很多报警代码，如解密失败（decryption_failed）、记录溢出（record_overflow）、未知CA（unknown_ca）、拒绝访问（access_denied）等；
* 密文族和客户证书：SSLv3.0和TLS存在少量差别，即TLS不支持Fortezza密钥交换、加密算法和客户证书；
* certificate_verify和finished消息：SSLv3.0和TLS在用certificate_verify和finished消息计算MD5和SHA-1散列码时，计算的输入有少许差别，但安全性相当；
* 加密计算：TLS与SSLv3.0在计算主密值（master secret）时采用的方式不同；
* 填充：用户数据加密之前需要增加的填充字节。在SSL中，填充后的数据长度要达到密文块长度的最小整数倍。而在TLS中，填充后的数据长度可以是密文块长度的任意整数倍（但填充的最大长度为255字节），这种方式可以防止基于对报文长度进行分析的攻击。

#### TLS的主要增强内容

TLS的主要目标是使SSL更安全，并使协议的规范更精确和完善。TLS 在SSL v3.0 的基础上，提供了以下增强内容：

* 更安全的MAC算法
* 更严密的警报
* “灰色区域”规范的更明确的定义

#### TLS对于安全性的改进

* 对于消息认证使用密钥散列法：TLS 使用“消息认证代码的密钥散列法”（HMAC），当记录在开放的网络（如因特网）上传送时，该代码确保记录不会被变更。SSLv3.0还提供键控消息认证，但HMAC比SSLv3.0使用的（消息认证代码）MAC 功能更安全；
* 增强的伪随机功能（PRF）：PRF生成密钥数据。在TLS中，HMAC定义PRF。PRF使用两种散列算法保证其安全性。如果任一算法暴露了，只要第二种算法未暴露，则数据仍然是安全的；
* 改进的已完成消息验证：TLS和SSLv3.0都对两个端点提供已完成的消息，该消息认证交换的消息没有被变更。然而，TLS将此已完成消息基于PRF和HMAC值之上，这也比SSLv3.0更安全；
* 一致证书处理：与SSLv3.0不同，TLS试图指定必须在TLS之间实现交换的证书类型；
* 特定警报消息：TLS提供更多的特定和附加警报，以指示任一会话端点检测到的问题。TLS还对何时应该发送某些警报进行记录。

::: warning 注意
HTTPS 并不是绝对安全的，不排除中间人攻击。
:::

## 申请证书

Let's Encrypt作为一个公共且免费SSL的项目逐渐被广大用户传播和使用，是由Mozilla、Cisco、Akamai、IdenTrust、EFF等组织人员发起，主要的目的也是为了推进网站从HTTP向HTTPS过度的进程，目前已经有越来越多的商家加入和赞助支持。

::: tip 证书有效期
* Let's Encrypt 在今年 3 月份就已经推出泛域名证书支持了，也就是说不用每个子域名再重复申请证书了。
* Let's Encrypt证书是有效期90天的，需要我们自己手工更新续期才可以，但是可以在服务器上通过执行定时任务进行自动续期。
:::

### 安装所需工具

该操作需要服务器支持 socat 及 curl 模块

```bash
curl https://get.acme.sh | sh
```

::: tip 提示
安装过程中脚本会自动添加定时任务用于续期证书
:::

### 获取域名服务商的APIKey

这里只说明阿里的DNS如何操作，其他的服务商类似。登录阿里云控制台，获取[APIKey](https://ak-console.aliyun.com/#/accesskey)，然后执行如下命令，用于声明临时变量供脚本调用API时认证：

```bash
export Ali_Key="sdfsdfsdfljlbjkljlkjsdfoiwje"
export Ali_Secret="jlsdflanljkljlfdsaklkjflsa"
```

### 获取证书

acme.sh 实现了 acme 协议支持的所有验证协议，一般有两种方式验证: http 和 dns 验证。由于泛域名证书的解析目前仅支持 DNS 方式验证，下面我们将通过 DNS 方式来验证你的域名所有权。

```bash
~/.acme.sh/acme.sh --issue --dns dns_ali -d example.com -d *.example.com
```

::: tip 说明
* dns_ali 为服务商名称，具体可以参考[官方文档](https://github.com/Neilpang/acme.sh/blob/master/dnsapi/README.md)；
* 第一个域名，是你要申请的主域名，如：bettere.com；
* 第二个是泛解析域名，如：\*.betterde.com；

这种方式将自动为你的域名添加一条 txt 解析，验证成功后，这条解析记录会被删除，所以对你来说是无感的，就是要等 120秒。证书生成成功后，默认保存在 ~/.acme.sh/你的顶级域名中
:::

## 部署证书

### 拷贝证书

```bash
cp ~/.acme.sh/example.com/fullchain.cer /etc/nginx/ssl/fullchain.cer
cp ~/.acme.sh/example.com/example.com.key /etc/nginx/ssl/example.key
```

### 公共配置文件

```bash
mkdir /etc/nginx/common -p
vim /etc/nginx/common/ssl.conf
```
配置如下

```
server_tokens   off;

ssl_session_cache        shared:SSL:10m;
ssl_session_timeout      60m;

ssl_session_tickets      on;

ssl_stapling             on;
ssl_stapling_verify      on;

resolver                 223.5.5.5 223.6.6.6  valid=300s;
resolver_timeout         10s;
ssl_prefer_server_ciphers on;

# 证书路径 绝对地址
ssl_certificate          /etc/nginx/ssl/fullchain.cer;
ssl_certificate_key      /etc/nginx/ssl/example.key;

ssl_protocols            TLSv1 TLSv1.1 TLSv1.2;

ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:ECDHE-RSA-AES128-GCM-SHA256:AES256+EECDH:DHE-RSA-AES128-GCM-SHA256:AES256+EDH:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4";

add_header Strict-Transport-Security "max-age=31536000;includeSubDomains;preload";
add_header  X-Frame-Options  deny;
add_header  X-Content-Type-Options  nosniff;
add_header x-xss-protection "1; mode=block";
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https:; connect-src 'self' https:; img-src 'self' data: https: blob:; style-src 'unsafe-inline' https:; font-src https:";
```

### 配置站点

#### 主站点配置

```
server {
    listen 80;
    listen [::]:80;
    server_name www.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2 fastopen=3 reuseport;
    listen [::]:443 ssl http2 fastopen=3 reuseport;
    server_name www.example.com;

    include common/ssl.conf;

    if ($host != 'www.godruoyi.com' ) {
        rewrite ^/(.*)$ https://www.godruoyi.com/$1 permanent;
    }
}
```

#### 子站点配置

```
server {
    listen 80;
    listen [::]:80;
    server_name api.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443;      
    listen [::]:443;
    server_name api.example.com;

    include common/ssl.conf;

    if ($host != 'api.godruoyi.com' ) {
        rewrite ^/(.*)$ https://api.godruoyi.com/$1 permanent;
    }
}
```
#### 完成

```bash
# 测试配置文件
nginx -t

# 重载配置
nginx -s reload
```

::: tip 其他工具
另一个工具是[Certbot](https://certbot.eff.org)，有兴趣的可以参考官方文档
:::
