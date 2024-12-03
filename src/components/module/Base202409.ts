import * as THREE from "three";
import gsap from "gsap";
import Camera from "./Camera";

export default class Base {
  private readonly _scene: THREE.Scene;
  private readonly l_camera: Camera;
  private l__camera: THREE.OrthographicCamera;
  private l_renderer: THREE.WebGLRenderer;
  private readonly l_loader: THREE.TextureLoader;
  private readonly l_mate: THREE.ShaderMaterial;
  private readonly l_geom: THREE.PlaneBufferGeometry;
  private l_disp: any;
  private readonly l_image_meshs: THREE.Mesh;

  private __width: number;
  private __height: number;
  private __image_src: any;
  private __textures: any;
  private __state: any;
  private __data: any;
  private __vertex: string;
  private __fragment: string;

  constructor(canvas_element: any, path_number: number) {
    this.__vertex = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;

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
      
      vec4 disp = texture2D(disp, uv*10.0);
      vec2 dispVec = vec2(disp.x*0.1, disp.y*0.1);
      
      vec2 distPos1 = uv + (dispVec * intensity * dispPower)*10.0;
      vec2 distPos2 = uv + (dispVec * (intensity * (1.0 - dispPower)));
      
      vec4 _texture1 = texture2D(texture1, distPos1);
      vec4 _texture2 = texture2D(texture2, distPos2);
      
      gl_FragColor = mix(_texture1, _texture2*0.9, dispPower);
    }
    `;
    this.__image_src = ["./sd_01.jpg", "./sd_02.jpg", "./sd_03.jpg"];
    this.__state = {
      animating: false,
      text: false,
      total: this.__image_src.length - 1,
      delta: 0,
    };
    this.__data = {
      current: 0,
      next: 1,
      total: this.__image_src.length - 1,
      delta: 0,
    };
    this.__width = window.innerWidth;
    this.__height = window.innerHeight;
    this._scene = new THREE.Scene();
    this.l_loader = new THREE.TextureLoader();

    this.cameraSet();
    this.l_renderer = new THREE.WebGLRenderer({
      canvas: canvas_element,
      antialias: true,
    });
    this.l_renderer.setPixelRatio(window.devicePixelRatio);
    this.l_renderer.setSize(this.__width, this.__height);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    this.__textures = [];
    this.imageLoader();

    this.__image_src.forEach((image, index) => {
      const texture = loader.load(image + "?v=" + Date.now(), () => {
        // this.re__view()
      });
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      if (index === 0 && this.l_mate) {
        this.l_mate.uniforms.size.value = [
          texture.image.naturalWidth,
          texture.image.naturalHeight,
        ];
      }
      this.__textures.push(texture);
    });

    // this.l_disp = loader.load('./disp.png',this.re__view)
    // this.l_disp.magFilter = this.l_disp.minFilter = THREE.LinearFilter
    // this.l_disp.wrapS = this.l_disp.wrapT = THREE.RepeatWrapping
    let __view_number = {
      now: 0,
      future: 0,
    };

    switch (path_number) {
      case 1:
        __view_number = {
          now: 0,
          future: 1,
        };
        break;
      case 2:
        __view_number = {
          now: 1,
          future: 2,
        };
        break;
      default:
        __view_number = {
          now: 2,
          future: 0,
        };
        break;
    }

    this.l_mate = new THREE.ShaderMaterial({
      uniforms: {
        dispPower: { value: 0.0 },
        intensity: { value: 0.5 },
        res: { value: new THREE.Vector2(this.__width, this.__height) },
        size: { value: new THREE.Vector2(1, 1) },
        texture1: { value: this.__textures[__view_number.now] },
        texture2: { value: this.__textures[__view_number.future] },
        disp: { value: this.l_disp },
      },
      transparent: true,
      vertexShader: this.__vertex,
      fragmentShader: this.__fragment,
    });

    this.l_geom = new THREE.PlaneBufferGeometry(this.__width, this.__height, 1);
    this.l_image_meshs = new THREE.Mesh(this.l_geom, this.l_mate);

    this._scene.add(this.l_image_meshs);

    this.re__view();
    this.nextSlide(path_number);
  }

  loop() {
    this.re__view();
    requestAnimationFrame(this.loop.bind(this));
  }

  re__view() {
    this.l_renderer.render(this._scene, this.l__camera);
  }

  // bindAll() {
  //   ['render', 'nextSlide']
  //   .forEach( (fn):void => {
  //     this[fn] = this[fn].bind(this)
  //   })
  // }

  imageLoader() {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    this.__textures = [];
    this.__image_src.forEach((image, index) => {
      const texture = loader.load(image + "?v=" + Date.now(), () => {
        // this.render()
      });
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      if (index === 0 && this.l_mate) {
        this.l_mate.uniforms.size.value = [
          texture.image.naturalWidth,
          texture.image.naturalHeight,
        ];
      }
      this.__textures.push(texture);
    });

    this.l_disp = loader.load("./disp.png");
    this.l_disp.magFilter = this.l_disp.minFilter = THREE.LinearFilter;
    this.l_disp.wrapS = this.l_disp.wrapT = THREE.RepeatWrapping;
  }

  cameraSet() {
    this.l__camera = new THREE.OrthographicCamera(
      this.__width / -2,
      this.__width / 2,
      this.__height / 2,
      this.__height / -2,
      1,
      1000
    );
    // this.l__camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)

    this.l__camera.lookAt(0, 0, 0);
    this.l__camera.position.z = 1;
  }

  nextSlide(number: number) {
    this.__data.current =
      this.__data.current === this.__data.total ? 0 : this.__data.current + 1;
    this.__data.next =
      this.__data.current === this.__data.total ? 0 : this.__data.current + 1;
    if (this.__state.animating) return;
    this.__state.animating = true;
    switch (number) {
      case 1:
        this.moveNext(0, 1);
        break;
      case 2:
        this.moveNext(1, 2);
        break;
      default:
        this.moveNext(2, 0);
        break;
    }
  }

  moveNext(number_old, number_new) {
    let _number_old = number_old;
    let _number_new = number_new;
    // if(!number_old){
    //   _number_old = 0
    //   _number_new = 0
    // }
    gsap.to(this.l_mate.uniforms.dispPower, 2.5, {
      value: 1,
      onUpdate: () => {
        this.re__view();
      },
      onComplete: () => {
        this.l_mate.uniforms.dispPower.value = 0.0;
        this.changeBackgroundImage(_number_old, _number_new);
        this.re__view.bind(this);
        this.__state.animating = false;
      },
    });
  }

  changeBackgroundImage(number_old, number_new) {
    this.l_mate.uniforms.texture1.value = this.__textures[number_old];
    this.l_mate.uniforms.texture2.value = this.__textures[number_new];
  }
}
