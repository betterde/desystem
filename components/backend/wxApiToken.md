# 微信授权API-Token

## 说明
解决前后端分离Token包含微信授权信息

## 安装配置
### 配置
- `config/app.php`
```php
/**
 * 前端接受Token地址
 */
'mobile_wx' => 'http://debiw.trc-demo.com/',
/**
 * 默认密码
 */
'password' => '123456',

```
- `routes/api.php`
```php
/**
 * 微信认证
 */
Route::group(['middleware' => ['web', 'wechat.oauth']], function () {
    // 获取微信授权,跳转到前端地址
    Route::any('/wx_user', 'Wx\WxController@wx_user');
});
```
- `routes/web.php`
```php
/**
 * 公众号二维码页面
 */
Route::get('/er_wei_ma', 'Wx\WxController@er_wei_ma');

```

### Models
```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;



    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'mobile', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * 查询用户的时候name字段处理
     *
     * @author Eric
     * @param $value
     * @return string
     */
    public function getNameAttribute($value)
    {
        return base64_decode($value);
    }

    /**
     * 添加用户的时候name字段处理
     *
     * @author Eric
     * @param $value
     * @return string
     */
    public function setNameAttribute($value)
    {
        return $this->attributes['name'] = base64_encode($value);
    }

    public function getJWTIdentifier()
    {
        // TODO: Implement getJWTIdentifier() method.
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        // TODO: Implement getJWTCustomClaims() method.
        return [];
    }
}
```

### 填充文件
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('mobile')->nullable()->unique()->comment('openid 用户获取Token');
            $table->string('shou_ji')->nullable()->unique()->comment('手机号码');
            $table->string('openid')->nullable()->comment('微信openid');
            $table->string('path')->nullable()->comment('微信头像地址');
            $table->string('password')->nullable();
            $table->string('sex',1)->nullable()->comment('性别 男 女');
            $table->string('city',50)->nullable()->comment('城市');
            $table->string('province',50)->nullable()->comment('省份');
            $table->string('country',50)->nullable()->comment('国家');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}

```

### 依赖
- [betterde/response 参考](response.html)
- [overtrue/laravel-wechat 仓库地址](https://github.com/overtrue/laravel-wechat)
- [tymon/jwt-auth 参考](jwtauth.html)
```php
composer require betterde/response
composer require overtrue/laravel-wechat
composer require tymon/jwt-auth
```

## 代码
### Controller
- `App/Http/Controllers/Wx/WxController.php`
```php
<?php

namespace App\Http\Controllers\Wx;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;

class WxController extends Controller
{
    /**
     * 获取wechat
     *
     * @author Eric
     * @return \Illuminate\Foundation\Application|mixed
     */
    public function getWechat()
    {
        $wechat = app('wechat.official_account');
        return $wechat;
    }

    /**
     * 根据openid获取用户信息
     *
     * @author Eric
     * @param $openid
     * @return mixed
     */
    public function getWxUser($openid)
    {
        $wechat = $this->getWechat();
        $user = $wechat->user->get($openid);
        return $user;

    }
    /**
     * 获取微信用户信息
     *
     * @author Eric
     * @param Request $request
     */
    public function wx_user(Request $request)
    {
        $url = $request->input('url', 'http://debiw.trc-demo.com/');
        $wx = session('wechat.oauth_user.default');
        $data = [];
        // 查询用户是否存在，不存就获取并写入
        $User = new User();
        $User_data = $User->where('openid', $wx['id'])->first();
        if(!$User_data)
        {
            $user = $this->getWxUser($wx['id']);
            if($user['subscribe'] == 0)
            {
                $str = '识别二维码关注微信公众号';
                header('location:/er_wei_ma/');
                exit;
            }
            $User->name = $user['nickname'];
            $User->mobile = $wx['id'];
            $User->password = bcrypt(Config('app.password'));
            $User->openid = $wx['id'];
            $User->path = $user['headimgurl'];
            $User->city = $user['city'];
            $User->province = $user['province'];
            $User->country = $user['country'];
            $User->sex = $user['sex'];
            $User->save();
            $User_data = $User->where('openid', $wx['id'])->first();


        }

        $token = Auth::guard('api')->attempt([
            'mobile' => $User_data->mobile,
            'password' => Config('app.password')
        ]);

        header('location:'.Config('app.mobile_wx').'?token='.$token.'&url='.$url);exit;

    }

    /**
     * 二维码显示页面
     *
     * @author Eric
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function er_wei_ma()
    {
        $show = [];
        $show['path'] = 'upload/er_wei_ma.jpg';
        return view('er_wei_ma', compact('show'));
    }
}
```
### resources
- `resources/views/er_wei_ma.blade.php`
```php
<html>
<body>
<img src="{{$show['path']}}"/>
</body>
</html>
```
