### 使用方法

````javascript
const bottomSheet = new rn.BottomSheet(options)
// 手动关闭
bottomSheet.close(function() {
  console.log('close')
})
// or
// 需保证selector唯一
$(selector).bottomSheet(options)
$(selector).bottomSheet('close') // 手动关闭
````

### 参数

| 参数      |    介绍 | 类型  | 可选值 | 默认值 |
| :--: | :--:| :--:|:--:   | :--: |
| maskClose  | 点击遮罩是否关闭面板 |  boolean   | - | true |
| contentClass  | 添加面板class |  string   | - | - |
| title  | 标题，内容为字符串时显示 |  string/boolean   | - | false |


### 回调函数

| 名称      |    介绍 |   回调参数 |
| :--: | :--:|  :--: |
| onClose  | 关闭时调用函数 |  - |
| beforeClose  | 关闭前调用函数,return false 则不关闭面板  | - | 
| beforeClose  | 关闭前调用函数,return false 则不关闭面板   | - | 

### 事件
| 名称      |    介绍 |   回调参数 |
| :--: | :--:|  :--: |
| close  | 手动关闭 |  -  |
