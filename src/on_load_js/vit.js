export function initVit(canvas) {
  let width, height;
  let pixels = [];
  let coloredPixels = [];
  let colors = [
    "rgba(60,170,240,0.2)",
    "rgba(60,170,240,0.3)",
    "rgba(60,170,240,0.9)",
    "rgba(60,170,240,0.5)",
    "rgba(60,170,240,0.9)",
  ];
  let currentPixel = 0;
  const mousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  // const canavs = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");

  const drawGrid = () => {
    ctx.clearRect(0, 0, width, height);

    for (var i = 0, l = pixels.length; i < l; i++) {
      pixels[i][4] = 0;
    }

    for (let i = 0, l = coloredPixels.length; i < l; i++) {
      var pix =
        Math.floor(coloredPixels[i].y / 10) * (Math.floor(width / 10) + 1) +
        Math.floor(coloredPixels[i].x / 10);
      if (pixels[pix]) {
        // pixels[pix][3] = coloredPixels[i].color;
        pixels[pix][4] = coloredPixels[i].color;
        // pixels[pix][5] = coloredPixels[i].alpha;
      }

      if (coloredPixels[i].alpha > 0) coloredPixels[i].alpha -= 0.08;
      if (coloredPixels[i].alpha < 0) coloredPixels[i].alpha = 0;
      coloredPixels[i].x += coloredPixels[i].vx;
      coloredPixels[i].y += coloredPixels[i].vy;
    }

    for (var i = 0, l = pixels.length; i < l; i++) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#222";
      ctx.fillRect(pixels[i][0], pixels[i][1], pixels[i][3], pixels[i][3]);
      ctx.globalAlpha = pixels[i][5];
      ctx.fillStyle = pixels[i][4];
      ctx.fillRect(pixels[i][0], pixels[i][1], pixels[i][3], pixels[i][3]);
    }
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    pixels = [];
    for (var y = 0; y < height / 10; y++) {
      for (var x = 0; x < width / 10; x++) {
        pixels.push([x * 10, y * 10, 6, 6, "#222", 1]);
      }
    }
  };

  const draw = () => {
    launchPixel();
    drawGrid();

    requestAnimationFrame(draw);
  };

  const initColoredPixels = () => {
    for (let index = 0; index < 300; index++) {
      coloredPixels.push({
        x: width / 2,
        y: height / 2,
        alpha: 0,
        color: colors[index % 5],
        vx: -1 + Math.random() * 2,
        vy: -1 + Math.random() * 2,
      });
    }
  };

  const launchPixel = () => {
    coloredPixels[currentPixel].x = mousePosition.x;
    coloredPixels[currentPixel].y = mousePosition.y;
    coloredPixels[currentPixel].alpha = 1;

    currentPixel++;
    if (currentPixel > 299) currentPixel = 0;
  };

  resize();
  initColoredPixels();
  draw();

  // window.addEvsentListener('resize', resize);
  window.addEventListener("mousemove", function (e) {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
  });

  const touchMove = (e) => {
    e.preventDefault();
    mousePosition.x = e.touches[0].pageX;
    mousePosition.y = e.touches[0].pageY;
  };

  document.addEventListener("touchstart", touchMove);
  document.addEventListener("touchmove", touchMove);
}
