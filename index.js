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
    this.initWrap();
    this.initItems();
    this.generateStyleTag();
  }
  initContainer() {
    this.container = document.querySelector(".carousel-container");
    this.container.style.width = this.containerWidth + 'px';
    this.container.style.overflow = "hidden";
  }
  initWrap() {
    this.wrap = document.querySelector(".carousel-wrap");
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
    this.wrap.classList.add("carousel-animation");
  }
  initItems() {
    this.items = document.getElementsByClassName("carousel-item");
    this.forEachHTMLCollection(this.items, (i) => (i.style.float = "left"));
  }
  generateStyleTag() {
    const styleTag = document.createElement("style");
    styleTag.append(this.getCarouselAnimation());

    document.head.appendChild(styleTag);
  }
  getCarouselAnimation() {
    let result =
      ".carousel-animation {animation: move 50s linear infinite both running;}";
    result += ".carousel-animation:hover {animation-play-state: paused;}";
    result += `@keyframes move {0% {transform: translateX(0px);}100% {transform: translateX(-${
      this.wrap.offsetWidth - 3 * this.cloneChildWidth - 2 * this.itemSpace
    }px);}`;

    return result;
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
