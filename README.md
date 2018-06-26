## 项目预览

**IOS**：

![IOS预览.gif](https://upload-images.jianshu.io/upload_images/4043475-4621cf3fc4e30a90.gif?imageMogr2/auto-orient/strip)

**Android：**

![Android预览.gif](https://upload-images.jianshu.io/upload_images/4043475-a0a80fc22164f94f.gif?imageMogr2/auto-orient/strip)

扫描体验：

![二维码](http://upload-images.jianshu.io/upload_images/4043475-9b0da908568e6844.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

或者[点我](https://pan.baidu.com/s/1hu5wKVFsaqtT9c81oIWOoA)

整体功能跟之前小程序和 Android 项目的大差不差，主要包括四大模块：新闻、段子、历史上的今天和小爱同学（图灵机器人）。后面会对每个模块进行大致的介绍。

### 新闻模块

![news](http://upload-images.jianshu.io/upload_images/4043475-b0c0495487060fed.gif?imageMogr2/auto-orient/strip)

功能： 查看多种类型的实时新闻，其中包括：头条、社会、国内、国际、娱乐、体育、军事、科技、财经和时尚。并支持点击单个新闻查看新闻详情。

### 段子模块

![joker](http://upload-images.jianshu.io/upload_images/4043475-6da5504109e19c82.gif?imageMogr2/auto-orient/strip)

功能：查看最新的段子数据，支持下拉刷新和上拉加载更多查看往期的段子数据。

### 历史上的今天模块

![today](http://upload-images.jianshu.io/upload_images/4043475-b1b124478c6b7604.gif?imageMogr2/auto-orient/strip)

功能：查看历史上今天发生的事件，并支持点击查看事件的详情。

### 小爱模块



![Robot](http://upload-images.jianshu.io/upload_images/4043475-8e4c2f4c92e7bab4.gif?imageMogr2/auto-orient/strip)

功能：和机器人进行简单的对话聊天。

## 项目知识点

这个项目属于入门难度，所以我整个学习到开发差不多5天的时间。开发过程中会遇到一些难点或者坑，这里记录下来，方便自己后面查看，或许也可以帮助到小伙伴。

> 一些稍微简单的，比如配置环境，创建项目的我就不多说了，自己百度就可以直接查到，后文也会附上相关的链接。

### 开源组件

RN 原生也提供了很多的组件和接口 [官网入口](https://reactnative.cn/docs/0.51/getting-started.html)，社区也开源了很多开源组件，这里对那些无私奉献的开发者表示感谢。

我这个项目不复杂，因此用到的框架并不多，后续如果我再添加新的功能可能就需要添加相对应的框架了。

下面是我用到的组件：

![image-20180626160944141](http://upload-images.jianshu.io/upload_images/4043475-d128db93c71695ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`react` 和 `react-native` 创建项目的时候就下载了。

[native-base](https://docs.nativebase.io/Components.html#ref-components-headref) 比起原生的控件，样式上好看很多，并且提过了其他的控件，比如 `Card`、 `Head`等。

[react-native-swiper](https://github.com/leecade/react-native-swiper) 有点类似 `Android` 的 `ViewPager`实现轮播效果。

[react-navigation](https://github.com/react-navigation/react-navigation) 官方推荐的跳转，并且附带了 `tab` 组件。

具体的使用我就不多做介绍了，进入具体的官网，都会有非常详细的使用教程。

### 自定义组件

看上面的预览图，你会发现第一次请求网络或者下拉刷新&上拉的时候，会出现一个 `Loading` 这个就是简单的自定义组件，我接下来简单介绍另一个自定义组件：当请求失败，展示失败页面，并可以点击重试按钮进行重试。因为要把点击重试的事件回调给使用者调用，涉及到 `props` 的概念，很有代表性，也很常用，所以就介绍他吧。

先看一下效果。

![nerPreview](http://upload-images.jianshu.io/upload_images/4043475-6882c8da2e6ecd42.gif?imageMogr2/auto-orient/strip)

**界面搭建：** 这个不难。

**定义自定义属性：** 

```javascript
    static propTypes = {
        retryClick: PropTypes.func.isRequired
    };
```

声明属性的类型，`PropTypes.func` 代表这个属性是函数， `isRequired` 代表这个属性必须添加

**属性调用：** 在点击重试时调用这个属性，我这里是函数，所以直接执行该函数。

```javascript
onPress={() => {
    if (this.props.retryClick != null) {
    	this.props.retryClick()
	}
}}
```

**自定义控件使用：**

```
this.state.netErrorVisible ? (
    <NetworkFailureLayout retryClick={() => {
    	this.getData()
    }}/>
) : null
```

这里通过 `netErrorVisible` 字段控制网络请求是否成功。

### 布局

用到最多的就是 `flex` 布局，涉及到前端的知识不做介绍，本人也是前端小白。推荐学习链接。

[Flex 基础篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[Flex 实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

**快速实现圆角+阴影效果**

```css
shadowColor: '#ccc',
shadowOffset: {width: 2, height: 2,},
shadowOpacity: 0.5,
shadowRadius: 10,
backgroundColor: Color.white,
borderWidth: 0,
borderRadius: 5,
borderColor: 'rgba(0,0,0,0.1)',
padding: Size.public_margin,
elevation: 3,
overflow: 'hidden',
```



### 调试

模拟器 `cmd + M`  & 真机摇晃手机调起调试菜单。常用功能：

**Reload** 重新加载

**Debug JS Remotely** 

调试应用，会打开本地 `http://localhost:8081/debugger-ui` 调试界面，最好使用 `Chrome`

**Enable Live Reload** 实时预览，`cmd + s` 有文件变化便重新编译。 

### Android 打包

首先在项目根目录使用终端执行 `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/` 命令，会生成 `index.android.bundle`（这个文件很重要）和相关的资源文件到 `android/app` 的相关目录下。

其次就是正常的 `Android` 打包流程了。这里贴出教程链接： [Android 打包](https://www.jianshu.com/p/1380d4c8b596)

## 总结

整体开发起来，从 环境配置-创建项目-学习相关知识-开发-运行-调试-打包这一套流程走下来，还是蛮顺利的，可能因为项目比较简单的原因吧，当然也遇到了不少的坑，这里做个总结。

### 学习来源

1. [中文官网](https://reactnative.cn/) (不用多少，很详细，全面)
2. 某宝买的视频(有需要私聊)
3. 链接网站(文末会贴)

### 数据来源

[聚合数据](https://www.juhe.cn/) 没办法，暂时没有能力写接口，每天每个接口有 500 次的请求限制。

### 采坑心得

1.  `unable to connect with remote debugger Timeout while connecting to remote debugger`

- 检查是否连接设备 & 有且仅有一台设备
- 手机调试模式是否打开
- 调试服务是否打开
- 将存在的 `apk` 卸载重新运行
- 检查端口是否被占用

2. 使用 `createStackNavigator` 创建 `bottomBar` `titleBar` 白色

   在 `createStackNavigator`配置出添加 `headerMode: 'none',` 隐藏 `titleBar`，然后使用 `native-base` 中的 `Head` 创建 `TitleBar`。

3. `FlatList` 列表使用 `navigation` 进行跳转，`navigation not defined`

   `FlatList`属于自定义组件，如果需要使用 `navigation` 跳转，需要将 `navigation` 对象传到每个 `item`。

4. 运行失败

   ![image.png](https://upload-images.jianshu.io/upload_images/4043475-527f897e704d10dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

   经常会遇到这种错误，仔细排查日志详情，一般是可以找到问题的。

   ![image.png](https://upload-images.jianshu.io/upload_images/4043475-b78fa07c5b12706c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

   这里是因为 `Text` 导了两个包。

### 相关链接

项目已上传至 `Github`： [Qnews_React_Native](https://github.com/xiaweizi/QNews_React_Native)

[中文官网](https://reactnative.cn/)

[30 天学 RN](https://github.com/fangwei716/30-days-of-react-native)

[RN 学习指南](https://github.com/reactnativecn/react-native-guide)

[控件-awesome-react-native](https://github.com/reactnativecn/react-native-guide)

[控件-react-native-elements](https://react-native-training.github.io/react-native-elements/docs/0.19.0/getting_started.html)

[控件-native-base](https://docs.nativebase.io/Components.html#ref-components-headref)

[控件-Ant Design](https://rn.mobile.ant.design/docs/react/introduce-cn)

[Flex 基础篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[Flex 实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

[原文地址](http://xiaweizi.cn/article/68ab/)


本人也是小白，写的也不是很全面，请见谅。