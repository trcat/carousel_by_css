class Carousel {
  constructor(options) {
    if (options.el) {
      this.containerEl = options.el;
      this.containerWidth = options.width || 800;
      this.itemSpace = options.itemSpace || 20;
      this.direction = options.direction || "left";
      this.time = options.time || 50;
      this.container = document.querySelector(this.containerEl);
      this.wrap = document.querySelector(`${this.containerEl} .carousel-wrap`);
      this.items = document.querySelectorAll(
        `${this.containerEl} .carousel-wrap .carousel-item`
      );
      this.cloneChildWidth = 0;
      this.cloneCount = 0;

      this.initContainer();
    } else {
      throw new Error("组件使用不规范, 请务必设定 el 属性!");
    }
  }
  initContainer() {
    this.container.style.width = this.containerWidth + "px";
    this.container.style.overflow = "hidden";
    this.initWrap();
  }
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
  initItems() {
    this.forEachHTMLCollection(this.items, (i) => (i.style.float = "left"));
    this.generateCloneItems();
  }
  generateCloneItems(target) {
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
  forEachHTMLCollection(collection, callback) {
    for (let i = 0; i < collection.length; i++) {
      callback(collection[i]);
    }
  }
}

new Carousel({
  el: ".carousel-container",
  direction: "right",
  width: 800,
  itemSpace: 20,
  time: 25,
});
