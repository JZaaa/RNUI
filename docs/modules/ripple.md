点击波纹效果 ripple
--------------------
### 注意

``注：使用此功能会改变目标元素 position: 'relative'``

### 使用方法

````javascript
new rn.Ripple(selector, options)
// or
$(selector).ripple(options)
````

### 参数

| 参数      |    介绍 | 类型  | 可选值 | 默认值 |
| :--: | :--:| :--:|:--:   | :--: |
| on  | jquery触发事件 |  string   | - | click |
| opacity  | 波纹透明度 |  number   | - | 0.4 |
| color  | 波纹颜色 |  string   | - | auto |
| duration  | 动画时间 |  number   | - | 0.7 |
| easing  | 过渡效果 |  string   | - | liner |
| type  | 触发效果 |  string   | hit/center | hit |
