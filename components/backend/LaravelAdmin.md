# Laravel-admin

## wangeditor编辑器
- base64图片存储为文件
```php
/**
 * 编辑器base64_decode图片匹配
 *
 * @author Eric
 * @param $str
 * @return mixed
 */
public function nei_rong_img($str)
{
    preg_match_all('/data:\S+/',$str,$res);
    $url = env('APP_URL').'/';
    $res = $res[0];
    if(count($res) > 0)
    {
        admin_toastr('图片保存中,请稍等', 'info');
        foreach ($res as $k => $v)
        {
            $path = $this->images_save(substr($v,0, strlen($v)-1));
            $str = str_replace(
                $v,
                $url.$path.'"',
                $str);
        }
    }
    return $str;
}

/**
 * base64_decode图片存储到目录
 *
 * @author Eric
 * @param $imgBase64
 * @return string
 */
public function images_save($imgBase64)
{
    if (preg_match('/^(data:\s*image\/(\w+);base64,)/',$imgBase64,$res)) {
        //获取图片类型
        $type = $res[2];

        //图片保存路径
        $new_file = 'upload/'.date('Y').'/'.date('m').'/'.date('d').'/';

        if (!file_exists($new_file)) {

            mkdir($new_file,0755,true);
        }

        //图片名字
        $new_file = $new_file.time().Str::uuid().'.'.$type;
        file_put_contents($new_file,base64_decode(str_replace($res[1],'', $imgBase64)));
        return $new_file;
    }
}
```
