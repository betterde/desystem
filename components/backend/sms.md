# SMS(互亿)

## 安装配置
### 配置
- `.env`
```php
# 短信 互亿
SMS_ACCOUNT = XXX
SMS_PASSWORD = XXXXXXX
```
- `config/app.php`
```php
/**
 * 验证码生效范围(秒)
 */
'verify_seconds' => 1200,
```
- `routes/api.php`
```php
/**
 * 发送短信
 */
Route::post('fa_duan_xin','DuanXingController@fa_duan_xin');
/**
 * 验证短信验证码
 */
Route::post('verify_code','DuanXingController@verify_code');
```

### Models
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Duan_xin extends Model
{
    protected $table = 'duan_xin';

    protected $guarded = ['id'];
}

```

### 填充文件
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDuanXinTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('duan_xin', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code',20)->comment('短信验证码');
            $table->string('mobile', 15)->comment('手机号码');
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
        Schema::dropIfExists('duan_xin');
    }
}

```

### 依赖
```php
composer require betterde/response
```

## 代码
```php
<?php

namespace App\Http\Controllers;

use App\Models\Duan_xin;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class DuanXingController extends Controller
{
    /**
     * 发送短信
     *
     * @author Eric
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function fa_duan_xin(Request $request)
    {
        // 手机号
        $shou_ji = $request->shou_ji;

        if($shou_ji == "")
        {
            return failed('手机号不能为空');
        }

        $re = '';
        $code = rand(1000,9999);

        $ses = new Duan_xin();
        $data = $ses->where('mobile', $shou_ji)->whereBetween('created_at', [
            date('Y-m-d')." 00:00:00",date('Y-m-d')." 23:59:59"
        ])->get();
        //  验证今天是否发生了5条短信
        if(count($data)>=5){
            return failed('验证今天发送超过5条,请明日再试');
        }else{
            // 验证60秒内是否重复提交
            $endtime = date('Y-m-d H:i:s');
            $kstime = date('Y-m-d H:i:s',strtotime("- ".Config('app.verify_seconds')." seconds"));
            $liu_data = $ses->where('mobile', $shou_ji)->whereBetween('created_at', [$kstime,$endtime])->first();
            if($liu_data)
            {
                return failed('请'.Config('app.verify_seconds').'秒后重试');
            }
            return $liu_data;
            $contentstr 			= "您的验证码是：".$code."。请不要把验证码泄露给其他人。";
            //写入数据库
            $ses->code = $code;
            $ses->mobile = $shou_ji;
            $ses->save();
            //发送短信
            $re = $this->fasong_shouji_yan($shou_ji,$contentstr);

        }
        return success($re);
    }

    /**
     * 验证验证码是否正确
     *
     * @author Eric
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify_code(Request $request)
    {
        $str = '';
        // 手机号
        $shou_ji = $request->shou_ji;
        // 验证码
        $code = $request->code;

        if($shou_ji == "")
        {
            return failed('手机号不能为空');
        }
        if($code == "")
        {
            return failed('验证码不能为空');
        }
        $ses = new Duan_xin();
        $endtime = date('Y-m-d H:i:s');
        $kstime = date('Y-m-d H:i:s',strtotime("- ".Config('app.verify_seconds')." seconds"));
        $liu_data = $ses->where('mobile', $shou_ji)
            ->where('code', $code)
            ->whereBetween('created_at', [$kstime,$endtime])->first();

        if($liu_data)
        {
            // 验证成功逻辑
            $str = '验证成功';
        }
        else
        {
            return failed('验证失败');
        }

        return success($str);
    }

    /**
     * 发送手机验证码, 短信
     *
     * @author Eric
     * @param $mobile
     * @param $content
     * @return int
     */
    public function fasong_shouji_yan($mobile,$content){
        $url  		= "http://120.55.205.5/webservice/sms.php?method=Submit";
        $curlPost   = "account=".env('SMS_ACCOUNT','')."&password=".env('SMS_PASSWORD','')."&mobile=".$mobile."&content=".$content;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_NOBODY, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
        $return_str = curl_exec($curl);
        curl_close($curl);
        return 1;
    }
}

```
