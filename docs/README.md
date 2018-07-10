# RN-UI 2 
jQuery拓展插件, 目前主要补充weui.js组件功能，请与weui.js/weui混合使用


## 安装
````
git clone git@github.com:JZaaa/RNUI.git
````

## 使用
````html
    <link rel="stylesheet" href="./dist/rn.css">
    <script type="text/javascript" src="./vendor/jquery-2.2.4.js"></script>
    <script type="text/javascript" src="./dist/rn.min.js"></script>
    
    <script>
        // 推荐使用
        const sidebar = new rn.Sidebar(el, options)
        
        // or
        $(el).sidebar(options)
        $(el).sidebar(action)
    </script>
````

## 编译


**安装依赖**
````
npm install
````
**查看文档**
````
npm run doc
````
**开发环境**
````
npm run dev
````
**编译**
````
npm run build
````


## 组件

- [x] BottomSheet(options) 底部弹出面板
- [x] BackTop(el, options) 返回顶部
- [x] Ripple(el, options) 波纹效果
- [x] InputNumber(el, options) 数字步进器
- [x] Sidebar(el, options) 侧边栏
- [x] Mask(options) 遮罩层

