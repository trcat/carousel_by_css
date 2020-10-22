class Carousel {
  constructor(options) {
    this.containerWidth = options.width || 800;
    this.itemSpace = options.itemSpace || 20;
    this.cloneChildWidth = 0;
    this.container = null;
    this.wrap = null;
    this.items = null;
    this.init();
  }
  init() {
    this.initContainer();
    this.generateStyleTag();
  }
  initContainer() {
    this.container = document.querySelector(".carousel-container");
    this.container.style.width = this.containerWidth + "px";
    this.container.style.overflow = "hidden";
    this.initWrap();
  }
  initWrap() {
    this.wrap = document.querySelector(".carousel-wrap");
    this.initItems();
    let length = 0;
    const children = this.wrap.children;

    for (let i = 0; i < children.length; i++) {
      const width = children[i].offsetWidth;
      length += width;
      if (i !== 0) {
        children[i].style.marginLeft = this.itemSpace + "px";
        length += this.itemSpace;
        this.cloneChildWidth = width;
      }
    }

    this.wrap.style.width = length + "px";
    this.wrap.style.overflow = "auto";
    this.wrap.style.animation = "move 50s linear infinite both running";
    this.wrap.onmouseover = () => {
      this.wrap.style.animationPlayState = "paused";
    };
    this.wrap.onmouseleave = () => {
      this.wrap.style.animationPlayState = "running";
    };
  }
  initItems() {
    this.items = document.getElementsByClassName("carousel-item");
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
      this.wrap.append(this.items[i].cloneNode(true));
    }
  }
  generateStyleTag() {
    const styleTag = document.createElement("style");
    styleTag.id = "move";
    styleTag.append(
      `@keyframes move {0% {transform: translateX(0px);}100% {transform: translateX(-${
        this.wrap.offsetWidth - 3 * this.cloneChildWidth - 2 * this.itemSpace
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
  width: 800,
  itemSpace: 20,
});
