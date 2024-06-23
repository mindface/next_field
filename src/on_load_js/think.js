// 各種パラメーター

export function initParticle(canvasElement) {
  const ratio = 10;
  const minSpeed = 0.3;
  const maxSpeed = 2;
  const dist = 200;

  const canvasEl = canvasElement;
  const ctx = canvasEl.getContext("2d");
  let initParticle = 0;
  let aryParticle = [];
  let canvas = {};

  function random(min, max, deci = false) {
    let result = Math.random() * (max + 1 - min) + min;
    return deci ? result : Math.floor(result);
  }

  function init() {
    calc();
    draw();
  }
  init();

  window.onresize = function () {
    calc();
  };

  function calc() {
    canvas.width = canvasEl.width = document.body.clientWidth;
    canvas.height = canvasEl.height = document.body.clientHeight;
    initParticle = Math.floor(
      (canvas.width / 300) * ratio + (canvas.height / 300) * ratio
    );
    if (aryParticle.length < initParticle) {
      create(aryParticle.length);
    }
  }

  function create(start) {
    for (let index = start; index < initParticle; index++) {
      aryParticle.push({
        position: {
          x: random(0, canvas.width),
          y: random(0, canvas.height),
        },
        direction: {
          x: random(minSpeed, maxSpeed, true) * (random(0, 1) ? -1 : 1),
          y: random(minSpeed, maxSpeed, true) * (random(0, 1) ? -1 : 1),
        },
        circle: 2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < initParticle; index++) {
      let _p = aryParticle[index];
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 1;
      ctx.arc(_p.position.x, _p.position.y, _p.circle, 0, 2 * Math.PI);
      ctx.fill();

      aryParticle[index].position.x += _p.direction.x;
      aryParticle[index].position.y += _p.direction.y;

      if (_p.position.x < 0 || _p.position.x > canvas.width) {
        aryParticle[index].direction.x *= -1;
      }
      if (_p.position.y < 0 || _p.position.y > canvas.height) {
        aryParticle[index].direction.y *= -1;
      }

      if (_p.position.x < -_p.circle) aryParticle[index].position.x = _p.circle;
      if (_p.position.x > canvas.width + _p.circle)
        aryParticle[index].position.x = canvas.width - _p.circle * 2;
      if (_p.position.y < -_p.circle) aryParticle[index].position.y = _p.circle;
      if (_p.position.y > canvas.height + _p.circle)
        aryParticle[index].position.y = canvas.height - _p.circle * 2;

      for (let _index = 0; _index < initParticle; _index++) {
        let _n = aryParticle[_index];
        if (index != _index) {
          let _dist =
            Math.abs(_p.position.x - _n.position.x) +
            Math.abs(_p.position.y - _n.position.y);
          if (_dist < dist) {
            ctx.beginPath();
            ctx.globalAlpha =
              dist - _dist > dist / 2
                ? 1
                : 1 - (dist / 2 - (dist - _dist)) / (dist / 2);
            ctx.strokeStyle = "#ffffff";
            ctx.moveTo(_p.position.x, _p.position.y);
            ctx.lineTo(_n.position.x, _n.position.y);
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(draw);
  }
}
