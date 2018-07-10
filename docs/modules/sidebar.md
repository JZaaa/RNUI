### 使用方法

````javascript
const sidebar = new rn.Sidebar(selector, options)
sidebar.open(callback) // 打开侧边栏
sidebar.close(callback) // 关闭侧边栏
sidebar.toggle(callback) // 切换侧边栏

// or
$(selector).sidebar(options)
$(selector).sidebar('open')
$(selector).sidebar('close')
$(selector).sidebar('toggle')

````

### 参数

| 参数      |    介绍 | 类型  | 可选值 | 默认值 |
| :--: | :--:| :--:|:--:   | :--: |
| align  | 侧边栏方向 |  string | left/right | left |
| mask  | 显示阴影层,点击阴影会自动关闭侧边栏 |  boolean   | - | true |

### 回调函数

| 名称      |    介绍 |   回调参数 |
| :--: | :--:|  :--: |
| onOpen  | 打开回调 |  -  |
| onClose  | 关闭回调 |  -  |

### 事件
| 名称      |    介绍 |   回调参数 |
| :--: | :--:|  :--: |
| open  | 打开侧边栏 |  -  |
| close  | 关闭侧边栏 |  -  |
| toggle  | 切换侧边栏 |  -  |
