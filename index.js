class Carousel {
  constructor(options) {
    this.generateStyleTag();
  }
  generateStyleTag() {
    const styleTag = document.createElement("style");
    styleTag.append(this.getCarouselAnimation())

    document.head.appendChild(styleTag);
  }
  getCarouselAnimation() {
    let result =
      ".carousel-animation {animation: move 50s linear infinite both running;}";
    result += ".carousel-animation:hover {animation-play-state: paused;}";
    result +=
      "@keyframes move {0% {transform: translateX(0px);}100% {transform: translateX(-3220px);}";

    return result;
  }
}

new Carousel();
