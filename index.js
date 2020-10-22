class Carousel {
  constructor(options) {
    // 如果没有传入 el, 则不作任何事情
    if (options.el) {
      // 目标,用来获取 container、wrap、还有 items
      this.containerEl = options.el;
      // 轮播组件可视范围宽度
      this.containerWidth = options.width || 800;
      // 轮播内容间隔
      this.itemSpace = options.itemSpace || 20;
      // 轮播方向
      this.direction = options.direction || "left";
      // 单次轮播完成时间
      this.time = options.time || 50;
      // container element
      this.container = document.querySelector(this.containerEl);
      // wrap element
      this.wrap = document.querySelector(`${this.containerEl} .carousel-wrap`);
      // item elements
      this.items = document.querySelectorAll(
        `${this.containerEl} .carousel-wrap .carousel-item`
      );
      // 克隆 item 相关属性
      this.cloneChildWidth = 0;
      this.cloneCount = 0;
      // init
      this.initContainer();
    } else {
      throw new Error("组件使用不规范, 请务必设定 el 属性!");
    }
  }
  /**
   * 给 container 设定样式, 并初始化 wrap
   */
  initContainer() {
    this.container.style.width = this.containerWidth + "px";
    this.container.style.overflow = "hidden";
    this.initWrap();
  }
  /**
   * 先初始化 items, 然后设定 wrap 的宽度等样式, 并设定动画
   */
  initWrap() {
    this.initItems();
    let length = 0;
    const children = this.wrap.children;

    for (let i = 0; i < children.length; i++) {
      const width = children[i].offsetWidth;
      length += width;
      if (i !== 0) {
        children[i].style.marginLeft = this.itemSpace + "px";
        length += this.itemSpace;
      }
    }

    this.wrap.style.width = length + "px";
    this.wrap.style.overflow = "auto";

    if (length > this.containerWidth) {
      this.wrap.style.animation = `move ${
        this.time
      }s linear infinite both running ${
        this.direction === "left" ? "normal" : "reverse"
      }`;
      this.wrap.onmouseover = () => {
        this.wrap.style.animationPlayState = "paused";
      };
      this.wrap.onmouseleave = () => {
        this.wrap.style.animationPlayState = "running";
      };
      this.generateStyleTag();
    }
  }
  /**
   * 给 items 设定样式, 并根据实际情况, 克隆若干元素作为循环交替元素
   */
  initItems() {
    this.forEachHTMLCollection(this.items, (i) => (i.style.float = "left"));
    this.generateCloneItems();
  }
  /**
   * 根据 container 和 items 的宽度, 计算出需要克隆多少个元素成为循环交替元素
   */
  generateCloneItems() {
    let count = 0;
    let result = this.container.offsetWidth;

    const complete = () => {
      result = result - this.items[count].offsetWidth;
      if (result > 0) {
        count += 1;
        complete();
      } else {
        return;
      }
    };

    complete();

    for (let i = 0; i <= count; i++) {
      const element = this.items[i];
      this.wrap.append(element.cloneNode(true));
      this.cloneChildWidth += element.offsetWidth;
    }
    this.cloneCount = count;
  }
  /**
   * 在 <head> 中添加 <style> 标签, 用来声明动画
   */
  generateStyleTag() {
    const styleTag = document.createElement("style");
    styleTag.id = "move";
    styleTag.append(
      `@keyframes move {0% {transform: translateX(0px);}100% {transform: translateX(-${
        this.wrap.offsetWidth -
        this.cloneChildWidth -
        this.cloneCount * this.itemSpace
      }px);}`
    );

    document.head.appendChild(styleTag);
  }
  /**
   * 遍历 HTMLCollection (document.querySelectorAll 的返回值)
   * @param {HTMLCollection} collection 
   * @param {Function} callback 
   */
  forEachHTMLCollection(collection, callback) {
    for (let i = 0; i < collection.length; i++) {
      callback(collection[i]);
    }
  }
}

new Carousel({
  el: ".carousel-container", // 目标
  direction: "left", // 轮播方向
  width: 800, // 轮播可视范围宽度
  itemSpace: 20, // 轮播内容间距
  time: 25, // 单词轮播完成时间
});
