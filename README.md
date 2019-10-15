## NavSlideCannel

##### 简介

> NavslideCannel为一款精简的slide频道导航组件，可以根据需求自定义样式。方便数据的插入以及渲染，并为之提供对应的api，该组件轻量高校，非常适合用于移动端导航需求，可轻松构建对应的导航结构。

***

##### 下载依赖项

```javascript
npm install swiper --save -D
```
>   先下载base目录文件，载入到项目的src根路径下，其中的目录名称和文件名称可根据个人习惯自定义重命名。如果没有安装 less 须将 base目录中css文件夹下的 slide.less 文件先转成css文件！

##### 导入

```javascript
import slide from '@/base/slide/slide'
```
###### 自定义组件标签

```javascript
 components: {'nav-slide': slide}
 // slide 可自定义标签，在这里以nav-slide来演示
```
#####  API参数
***
###### Props
| 参数 | 说明 | 类型 | 默认值 | 必需|
|:--:|:--|:--:|:--:|:--:|
|title| 频道导航栏的数组|Array| null|是(必需传入一个频道的数组集合)|
|highLightBarColor|颜色滑动条的颜色|String|rgb(255,21,76)|否|
|ordinaryCannelColor|频道字体的默认颜色|String|rgba(51,51,51,1)|否|
|highLightCannelCol|活动频道字体的高亮颜色|String|rgb(255,40,78)|否|
|BarWidth|颜色滑动条的长度|Number|36|否|
|PaddingBottom|以防position:fixed底部固定栏会导致slide不能显示全部|Number|0|否|
***
##### 方法
***
###### Events
| 事件名 | 说明 | 默认事件 |
|:--:|:--|:--:|
| slideChange |每滑动了一个slide频道后的回调函数，该函数参数返回活动项slide频道的索引值| -- |
***
##### 用法举例
```vue
 <nav-slide  @slideChange="Change"
                   :title="title"
                   :highLightBarColor="'linear-gradient(to right,orange 0%,#2B4BC9 100%)'"
                   :ordinaryCannelColor="'#000'"
                   :highLightCannelCol="'red'"
                   :BarWidth="40"
                   :PaddingBottom="40"
>
<div class="slides" v-for="(item,i) in title" :slot="'each_'+(i+1)" :key="i">
         <li style="margin: 100px auto;font-size: 18px">slide {{i+1}}</li>
</div>
</nav-slide>
<!-- 


 在nav-slide(该标签可自定义)标签中插入dom
 
 如果每个slide的dom结构大致相同则要为其绑定slot属性，要用v-for渲染的时候，在要插入dom的标签上加上 :slot="'each_'+(i+1)"
 
 如果每个slide的dom结构不一样，则需要单独为每个slide写出对应的样式结构
 
 如：
 
 <div class="slide1" slot="each_1" >
        slide1
 </div>
 
 <div class="slide2" slot="each_2" >
         slide2
  </div>
 .........
 <div class="slide8" slot="each_8" >
         slide8
  </div>
  
  这种情况需要为每个slide加上对应的slot属性，
  每个slide必需加上slot属性，根据slide的索引得到最终slot属性值
  例如第  3  个slide频道 需要加上 slot="each_3"
  
  
 -->
 
```
```javascript
 data() {
         return {
                title: ['综合', '单曲', '视频', '歌手', '专辑', '歌单', '电台', '用户'],
                // title 为slide频道传入的各频道的标题的数组
            }
       },
 methods:{
     Change(index){
         console.log(index)
         // index 为切换频道之后触发的Change函数，返回的是当前活动slide频道的索引，可在watch中监听其值的变化，来加载对应slide频道的数据
       }
    }
```
****
#### 图片演示



***

  ![查看图片](https://github.com/2902854803/DemoResource/blob/master/demoresource/images/JJDS_GIF_20191014_203503.gif)

***
