class Curve {
  constructor() {
    const str = 'Animation with gsap + canvas2D'
    let text = ''
    str.split('').forEach(e => {
      text += `<span class="char">${e}</span>`
    })
    document.querySelector('.js-split-text').innerHTML = text

    gsap.set('.char', {
      opacity: 0,
      y: 50,
    })

    this.obj = document.querySelector('#js-loader')
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.canvasSize = {
      width: innerWidth,
      height: innerHeight
    }

    this.canvas.width = this.canvasSize.width * Math.min(2, devicePixelRatio)
    this.canvas.height = this.canvasSize.height * Math.min(2, devicePixelRatio)

    this.canvas.style.width = `${this.canvasSize.width}px`
    this.canvas.style.height = `${this.canvasSize.height}px`

    this.obj.appendChild(this.canvas)

    this.point = {
      currentY: this.canvas.height * 5,
      curveY: this.canvas.height 
    }

    this.init()
  }

  init() {
    gsap.registerEffect({
      name: 'curve',

      defaults: {
        flag: true,
        delay: 0,
      },

      effect: (target, config) => {
        const tl = gsap.timeline({
          onUpdate: () => {
            this.curveUpdate(config.flag)
          }
        })
          .to(target, {
            duration: .8,
            curveY: 0,
            ease: 'power4.out',
            delay: config.delay
          })
          .to(target, {
            currentY: 0,
            duration: .8,
          }, '<')
        return tl
      }
    })

    const tl = gsap.timeline({ delay: .5 })
      .add(gsap.effects.curve(this.point))
      .add(this.textAnimation.bind(this))
      .set(this.point, {
        currentY: this.canvas.height * 5,
        curveY: this.canvas.height 
      })
      .set('.is-slide-up', {
        opacity: 0,
        y: 60
      })
      .add(gsap.effects.curve(this.point, { flag: false }), '+=2')
      .from('.main-visual img', {
        autoAlpha: 0,
        yPercent: 20,
        duration: 1,
        ease: 'power4.out'
      }, '-=0.3')
      .add(this.slideUpText.bind(this), '<')
  }

  textAnimation() {
    const tl = gsap.timeline()
      .to('.char', {
        opacity: 1,
        y: 0, 
        duration: 1,
        ease: 'back.out(3)',
        stagger: {
          each: 0.02,
        }
      }, '-=0.2')
      .to('.char', {
        opacity: 0,
        y: -100,
        duration: .6,
        ease: 'back.in(2)',
        stagger: {
          each: 0.01,
          ease: 'power2'
        }
      }, '-=0.5')
    
    return tl
  }

  slideUpText() {
    gsap.to('.is-slide-up',
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: {
          each: .05, // 遅延させる時間
          from: 'end' // 開始位置の指定 start, end, center, edges, random
        }
      }
    )
  }


  curveUpdate(flag) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = '#111'

    if (flag) {
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.fillStyle = '#fff'
    }

    console.log(this.canvas.width / 2);
    console.log(this.point.curveY);
    console.log(this.canvas.width);
    console.log(this.point.currentY);

    this.ctx.beginPath()
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(0, this.point.currentY)
    // this.ctx.quadraticCurveTo(this.canvas.width / 2, this.point.curveY, this.canvas.width, this.point.currentY)
    this.ctx.quadraticCurveTo(this.point.currentY, this.point.curveY / 2 , this.canvas.width, -(this.canvas.height / 10))
    this.ctx.lineTo(this.canvas.width, 0)
    this.ctx.closePath()
    this.ctx.fill()
  }
}

addEventListener('load', _ => {
  new Curve()
})