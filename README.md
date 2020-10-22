# carousel_by_css
以 css 为主, 尝试实现自动循环走马灯

## 用法

首先引入 `index.js` (是的我连名字都懒得换)，编写对应 html 和 javascript 即可:

```html
  <div class="carousel-container">
    <div class="carousel-wrap">
      <!--轮播内容-->
      <div class="carousel-item">1</div>
      <div class="carousel-item">2</div>
      <div class="carousel-item">3</div>
      <div class="carousel-item">4</div>
      <div class="carousel-item">5</div>
      <div class="carousel-item">6</div>
      <div class="carousel-item">7</div>
      <div class="carousel-item">8</div>
      <div class="carousel-item">9</div>
      <div class="carousel-item">10</div>
    </div>
  </div>
```

```javascript
new Carousel({
      el: ".carousel-container", // 目标, 必填, 不然会报错
      direction: "left", // 轮播方向, 选填, 默认值为 left
      width: 800, // 轮播可视范围宽度, 选填, 默认值为 800
      itemSpace: 20, // 轮播内容间距, 选填, 默认值为 20
      time: 25, // 单词轮播完成时间, 选填, 默认值为 50
})
```



## 实现思路

主要依靠 css 动画实现。走马灯效果说白了，就是一组内容，从左向右或从右向左平移，故很容易想到用 css 动画。示范代码如下:

```css
.animation {
    animation: move 50s linear both running
}

@keyframe {
    0% {
        transform: translateX(0px);
    }
    100% {
        transform: translateX(-3000px) // 平移距离
    }
}
```

上述 css 代码就可以实现一个从左向右平移 `3000`个像素距离的动画

### 如果实现循环

就我所知光靠 css 是不行的，还是需要通过 html 添加若干个克隆轮播内容，并配合调整位移距离，使得单次动画结束时，轮播显示内容和动画未开始时的轮播显示内容保持一致。

简单的说，*<u>就是动画开始时和动画结束时显示的内容是一样的</u>*。

这样，从视觉角度来说，就可以达成类似 `未开始动画 -> 动画进行中 -> 未开始动画` 的效果

然后我们在将 css 动画设定成循环播放，就可以达成自动循环轮播的效果。示例代码如下：

```html
<!--进行平移动画的外框-->
<div class="animation">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <!--根据实际情况, 依次克隆若干个录播内容-->
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```

```css
.animation {
    animation: move 50s linear infinite both running /*添加 infinite 将动画设置成循环*/
}

@keyframe {
    0% {
        transform: translateX(0px);
    }
    100% {
        transform: translateX(-3220px) /*因为多了克隆元素, 所以要修改平移距离, 让单次动画结束时显示的1、2、3*/
    }
}
```

## 优势和缺点

优势很明显，就是很简单，单纯靠 html 和 css 就可以实现。

缺点也很明显，没有办法动态变换轮播方向

## 浏览器支援情况

组件 JavaScript 代码用 ES6 标准撰写, 仅支持现代浏览器

## Log
- [x] 设置 `css animation` 实现单次走马灯
- [x] 添加过度元素, 实现走马灯的循环播放
- [x] 添加 `:hover` 走马灯暂停的效果
- [x] 用 javascript 设置动画css
- [x] 添加初始轮播方向控制功能