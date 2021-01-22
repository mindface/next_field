import * as THREE from "three"
import gsap from "gsap"
import Camera from "./Camera"

export default class Base {

  constructor(f_canvas){

    this.__vertex = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `

    this.__fragment = `
    varying vec2 vUv;

    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform sampler2D disp;

    uniform float dispPower;
    uniform float intensity;

    uniform vec2 size;
    uniform vec2 res;

    vec2 backgroundCoverUv( vec2 screenSize, vec2 imageSize, vec2 uv ) {
      float screenRatio = screenSize.x / screenSize.y;
      float imageRatio = imageSize.x / imageSize.y;
      vec2 newSize = screenRatio < imageRatio 
          ? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)
          : vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));
      vec2 newOffset = (screenRatio < imageRatio 
          ? vec2((newSize.x - screenSize.x) / 1.0, 0.0) 
          : vec2(0.0, (newSize.y - screenSize.y) / 1.0)) / newSize;
      return uv * screenSize / newSize + newOffset;
    }

    void main() {
      vec2 uv = vUv;
      
      vec4 disp = texture2D(disp, uv);
      vec2 dispVec = vec2(disp.x*0.1, disp.y*0.1);
      
      vec2 distPos1 = uv + (dispVec * intensity * dispPower);
      vec2 distPos2 = uv + (dispVec * -(intensity * (1.0 - dispPower)));
      
      vec4 _texture1 = texture2D(texture1, distPos1);
      vec4 _texture2 = texture2D(texture2, distPos2);
      
      gl_FragColor = mix(_texture1, _texture2, dispPower);
    }
    `
    this.__image_src = [
      "./sd_01.jpg",
      "./sd_02.jpg",
      "./sd_03.jpg"
    ]
    this.__state = {
       animating: false,
       text: false,
       total: this.__image_src.length - 1,
       delta: 0
    }
    this.__data = {
     current: 0,
     next: 1,
     total: this.__image_src.length - 1,
     delta: 0
   }
    this.__width = window.innerWidth
    this.__height = window.innerHeight
    this._scene = new THREE.Scene()
    this.L_loader = new THREE.TextureLoader()
    this.init(f_canvas)
  }

  init(f_canvas){
    this.cameraSet()
    this.L_renderer = new THREE.WebGLRenderer({canvas: f_canvas})
    this.L_renderer.setPixelRatio(window.devicePixelRatio)
    this.L_renderer.setSize(this.__width,this.__height)
    this.imageLoader()
    this.L_mate = new THREE.ShaderMaterial({
      uniforms:{
        dispPower: { type:'f', value: 0.0 },
        intensity: { type:'f', value: 0.5 },
        res: { value: new THREE.Vector2(this.__width,this.__height)},
        size: { value: new THREE.Vector2(1,1) },
        texture1: { type:'t', value: this.__textures[0] },
        texture2: { type:'t', value: this.__textures[1] },
        disp: { type: 't', value: this.L_disp }
      },
      transparent: true,
      vertexShader: this.__vertex,
      fragmentShader: this.__fragment
    })

    this.L_geom = new THREE.PlaneBufferGeometry(this.__width,this.__height,1)
    this.L_image_meshs = new THREE.Mesh( this.L_geom, this.L_mate );

    this._scene.add(this.L_image_meshs)
    this.render()
    this.nextSlide()

  }

  bindAll() {
    ['render', 'nextSlide']
    .forEach( (fn) => {
      this[fn] = this[fn].bind(this)
    })
  }

  imageLoader(){
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = ''
    this.__textures = []
    this.__image_src.forEach( (image, index) => {
      const texture = loader.load(image + '?v=' + Date.now(),()=>{
        this.render()
      })
      texture.minFilter = THREE.LinearFilter
      texture.generateMipmaps = false

      if( index === 0 && this.L_mate ){
        this.L_mate.uniforms.size.value = [
          texture.image.naturalWidth,
          texture.image.naturalHeight,
        ]
      }
      this.__textures.push(texture)
    })

    this.L_disp = loader.load('./disp.png',this.render)
    this.L_disp.magFilter = this.L_disp.minFilter = THREE.LinearFilter
    this.L_disp.wrapS = this.L_disp.wrapT = THREE.RepeatWrapping
  }

 cameraSet(){
  this.L__camera = new THREE.OrthographicCamera(
    this.__width / -2,
    this.__width / 2,
    this.__height / 2,
    this.__height / -2,
    1,
    1000
  )

  this.L__camera.lookAt(0,0,0)
  this.L__camera.position.z = 1
}

 nextSlide(){
   if(this.__state.animating) return
   this.__state.animating = true
   this.moveNext()
   this.__data.current = this.__data.current === this.__data.total ? 0 : this.__data.current + 1
   this.__data.next = this.__data.current === this.__data.total ? 0 : this.__data.current + 1
 }

 moveNext(number_old,number_new){
   let _number_old = number_old
   let _number_new = number_new
   if(!number_old){
     _number_old = 0
     _number_new = 0
   }
   gsap.to( this.L_mate.uniforms.dispPower, 2.5, {
     value: 1,
     onUpdate: this.render,
     onComplete: () => {
       this.L_mate.uniforms.dispPower.value = 0.0
       this.changeBackgroundImage(_number_old,_number_new)
       this.render.bind(this)
       this.__state.animating = false
     }      
   })
 }

 changeBackgroundImage(number_old,number_new){
   // this.mate.uniforms.texture1.value = this.textures[this.data.current]
   // this.mate.uniforms.texture2.value = this.textures[this.data.next]
   this.L_mate.uniforms.texture1.value = this.__textures[number_old]
   this.L_mate.uniforms.texture2.value = this.__textures[number_new]
 }

 loop(){
   this.render()
   requestAnimationFrame(this.loop.bind(this))
 }

 render(){
   console.log(this.L_renderer)
   // this.__uniforms[ 'time' ].value = performance.now() / 1000;
   // this.__renderer.setSize(this.__scene.fog.color,this._height_)
   this.L_renderer.render(this._scene,this.L_camera)
 }

}
