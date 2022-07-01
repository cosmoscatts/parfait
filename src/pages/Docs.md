---
title: 代码风格
---

<div class="mt-1/12 text-center">
  <!-- You can use Vue components inside markdown -->
  <div i-carbon-dicom-overlay class="text-4xl -mb-6 m-auto" />
  <h3>关于本项目的一些代码风格及习惯...</h3>
</div>

<blockquote align="center">
<p>💡 关于 JS 代码规范可参考 - <br><a href="https://github.com/BingKui/javascript-zh"><strong>Airbnb JavaScript 代码规范</strong></a><br>里面很详细.</p>
</blockquote>

#### 文件夹
<p align="center">
文件夹名称格式为`system-user`, 小写加`-`
</p>

#### 文件
<p align="center">
文件名称格式为驼峰命名<br>
例如: useBoolean.ts<br>
</p>

#### 类, 接口, 类型, 变量, 方法
```ts
// 类名统一大写
class User {
}

// 接口, 类型名称统一大写
type User = Record<string, any>

interface User {
  name: string
}

// 变量名除了全部常量, 统一为驼峰命名
// 常量
const PROJECT_NAME = 'Parfait'
// 普通变量
const user = 'me'
const userName = 'me'

// 方法名称统一驼峰命名, 最好使用 function 定义
function get() {
  return null
}

// 方法内部的方法使用箭头函数
function get() {
  const a = () => {

  }
  return a()
}
```

Check out the [GitHub repo](https://github.com/dud9/parfait) for more details.

<br>
