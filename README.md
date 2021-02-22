# blueSword 微信小程序 sdk

---

## 介绍 

1. 微信小程序sdk，提供了无埋点方案和手动埋点方案
2. 由于微信版本问题，未对完整兼容性做校验，只提供报错，如果版本兼容问题，请自行修改源码
3. 目前只在uniapp和原生上使用通过，对于其他框架不确定兼容性

## 使用

1. umd
```
// 将npm run build 执行后的静态文件引入
<script src="xxx.js"></script>
```

2. npm包
```
npm i bs-wxsdk -S
```

然后实例化Maidian，提供了无埋点方法 init ，同时也提供了手动埋点 handle ，提供了type, evtName, others， 埋点类型，事件名称，和其他的自定义属性。
