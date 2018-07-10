### 使用方法

````javascript
const inputNumber = new rn.InputNumber(selector, options)

// or
$(selector).inputNumber(options)
````

### 参数

| 参数      |    介绍 | 类型  | 可选值 | 默认值 |
| :--: | :--:| :--:|:--:   | :--: |
| decrease  | 减少绑定元素 |  string   | - | - |
| increase  | 增加绑定元素 |  string   | - | - |
| min  | 最小值 |  number   | - | - |
| max  | 最大值 |  number  | - | - |
| step  | 步进值 |  number  | - | 1 |
| precision  | 最大精确位数 |  number  | - | - |
| formatter  | 输入框展示格式化函数 |  function  | - | - |
| parser  | 输入框解析函数，对应formatter，若设置formatter选项，则此项必须设置 |  function  | - | - |


### 回调函数

| 名称      |    介绍 |   回调参数 |
| :--: | :--:|  :--: |
| onChange  | 数值改变回调函数 |  val,改变后的数值  |

### 事件
| 名称      |    介绍 |   回调参数 |
| :--: | :--:|  :--: |
| close  | 手动关闭 |  -  |
