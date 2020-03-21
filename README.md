---
description: 图片压缩工具
---

# tinypngjs

## 一、安装

```bash
npm install tinypngjs
```

```bash
var TinyPng = require("tinypngjs");
```

#### TinyPng.compress\(fromFolder,\[outFolder,onProgress\]\);

  
参数：

* fromFolder：需要压缩的文件夹
* outFolder：压缩后图片保存的文件夹
  * 可选
  * 默认值=fromFolder
* onProgress：下载进度回调

  回调函数：function\(res,percent\){}

  * res: Object,tinyjs压缩图片后返回的json
  * percent：Number当前进度

返回值 Promise

```javascript
var res = await TinyPng.compress("./a/");
```



#### TinyPng.compressImage\(fromImg,\[outImg\]\);

  
参数：

* fromImg：需要压缩的图片路径
* outFolder：压缩后图片的图片路径
  * 可选
  * 默认值=fromImg

返回值 Promise

```javascript
var res = await TinyPng.compressImg("./a/1.jpg");
```

##  客户端版

 为了满足更多的使用场景，通过上面的库做了一个带有界面的版本，只需要把文件夹拖进去就可以完成压缩并覆盖原来的图片；

Windows:[https://github.com/focusbe/tinyImage/releases/download/0.1/tinyimage\_win.zip](https://github.com/focusbe/tinyImage/releases/download/0.1/tinyimage_win.zip)  
欢迎下载使用

