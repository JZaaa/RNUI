--------------------
### 使用方法

````javascript
const mask = new rn.Mask(options)
mask.show(callback) // 打开遮罩层
mask.close(callback) // 移除遮罩层

````

### 参数

| 参数      |    介绍 | 类型  | 可选值 | 默认值 |
| :--: | :--:| :--:|:--:   | :--: |
| fixed  | 是否为绝对定位 |  boolean   | - | true |
| style  | 添加样式 |  object   | - | - |
| tapClose  | 点击自动关闭 |  boolean   | - | true |


### 回调函数

| 名称      |    介绍 |   回调参数 |
| :--: | :--:|  :--: |
| onTapClose  | 自动关闭回调 |  -  |
| onClick  | 点击回调 |  -  |

### 事件
| 名称      |    介绍 |   回调参数 |
| :--: | :--:|  :--: |
| getElement  | 获取当前实例化遮罩层 |  jquery对象的遮罩层，未添加监听  |
| show  | 打开遮罩层 |  -  |
| close  | 移除遮罩层 |  -  |
