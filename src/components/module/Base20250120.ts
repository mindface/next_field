import * as THREE from "three";
import { gsap, Expo } from "gsap";
import Camera from "./Camera";

export default class Base {
  private readonly _scene: THREE.Scene;
  private l_camera: THREE.PerspectiveCamera;
  private l__camera: THREE.OrthographicCamera;
  private l_renderer: THREE.WebGLRenderer;
  private l_raycaster: THREE.Raycaster;
  private readonly l_loader: THREE.TextureLoader;
  private readonly l_mate: THREE.ShaderMaterial;
  private l_geom: THREE.PlaneBufferGeometry;
  private l_disp: any;
  private readonly l_image_meshs: THREE.Mesh;

  private __width: number;
  private __height: number;
  private __image_src: any;
  private __textures: any;
  private __state: any;
  private __data: any;
  private __mouse: THREE.Vector2;
  private __vertex: string;
  private __fragment: string;
  private readonly _sceneMeshes: THREE.Mesh[] = [];

  private _tl = gsap.timeline();

  constructor(canvas_element?: HTMLCanvasElement, path_number?: number) {
    if(!canvas_element && !path_number) return;
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
    this.l_raycaster = new THREE.Raycaster();
    this.__mouse = new THREE.Vector2();

    this._scene = new THREE.Scene();
    this.l_loader = new THREE.TextureLoader();
    this.cameraSet();
    this.l_renderer = new THREE.WebGLRenderer({
      canvas: canvas_element,
      antialias: true,
    });
    this.l_renderer.setPixelRatio(window.devicePixelRatio);
    this.l_renderer.setClearColor("#e5e5e5");
    this.l_renderer.setSize(this.__width, this.__height)

    const light1 = new THREE.PointLight(0xFFFFFF, 1, 1000)
    light1.position.set(0,0,5);
    this._scene.add(light1);
    const light2 = new THREE.PointLight(0xFFFFFF, 1, 1000)
    light2.position.set(0,0,0);
    this._scene.add(light2);

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

    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mate = new THREE.MeshLambertMaterial({color: 0xF7F7F7});
    for (let index = 0; index < 105; index++) {
      const mesh = new THREE.Mesh(geo,mate);
      mesh.position.x = (Math.random() - 0.5) * 100;
      mesh.position.y = (Math.random() - 0.5) * 100;
      mesh.position.z = (Math.random() - 0.5) * 100;
      this._scene.add(mesh);
      this._sceneMeshes.push(mesh);
    }

    this.l_geom = new THREE.PlaneBufferGeometry(this.__width, this.__height, 1);
    this.l_image_meshs = new THREE.Mesh(this.l_geom, this.l_mate);
    this._scene.add(this.l_image_meshs);

    this.reView();
    this.nextSlide(path_number);
    // canvas_element.addEventListener('mousemove', (e) => this.onMouseMove(e, this.__mouse));
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.updateAnimations();
    this.reView();
  }

  reView() {
    this.l_renderer.render(this._scene, this.l_camera);
  }

  updateAnimations() {
    this._sceneMeshes.forEach((mesh) => {
      // mesh.rotation.y += 0.01;
    });

    // 背景のアニメーション更新処理
    if (this.l_mate) {
      this.l_mate.uniforms.dispPower.value = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;
    }
    // this._sceneMeshes.forEach((mesh) => {
    //   mesh.rotation.x += 0.01;
    //   mesh.rotation.y += 0.01;
    //   mesh.position.y += Math.sin(Date.now() * 0.001) * 0.1;
    // });
  }

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
    this.l_camera = new THREE.PerspectiveCamera(205, window.innerWidth / (window.innerHeight/2), 0.1, 10000);
    this.l_camera.position.z = 5;
  }

  nextSlide(number: number) {
    if(!this.l_camera?.position) return;
    // this._tl = gsap.timeline();

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

    const center = new THREE.Vector3(0, 0, 0); // 円の中心
    const radius = 30; // 円の半径
    const duration = 2; // アニメーションの時間（秒）

    // number に基づいてカメラのアングルを決定
    let startAngle = 0;
    let endAngle = 0;

    switch (number) {
      case 0:
        startAngle = 0;
        endAngle = Math.PI * 0.5;
        break;
      case 1:
        startAngle = Math.PI * 0.5;
        endAngle = Math.PI;
        break;
      case 2:
        startAngle = Math.PI;
        endAngle = Math.PI * 2.5;
        break;
      case 3:
        startAngle = Math.PI * 1.5;
        endAngle = Math.PI * 2;
        break;
      default:
        startAngle = 0;
        endAngle = Math.PI * 2;
        break;
    }

    this._tl = gsap.timeline({
      onUpdate: () => {
        const progress = this._tl.progress();
        const angle = startAngle + (endAngle - startAngle) * progress; // 円周上の角度を計算

        this.l_camera.position.x = center.x + Math.cos(angle) * radius;
        this.l_camera.position.z = center.z + Math.sin(angle) * radius;
        this.l_camera.lookAt(center); // カメラが常に中心を見るようにする

        this._sceneMeshes.forEach((mesh, index) => {

          // mesh.position.x + Math.cos(angle) * radius;
          // mesh.rotation.y += 0.01;
          // mesh.rotation.x += 0.1;
        });
      },
      onComplete: () => {
        console.log(`Slide ${number} animation complete.`);
      }
    });

    this._tl
      .to(this.l_mate.uniforms.dispPower, { duration: 2.5, value: 1, ease: "none" })
      .to(this.l_mate.uniforms.dispPower, { duration: 2.5, value: 0, ease: "none" }, `+=${duration}`);
    // this.changeBackgroundImage(this.__data.current, this.__data.next);
    this.__data.current = number;
    this.__data.next = (number + 1) % this.__image_src.length;
    this.changeBackgroundImage(this.__data.current, this.__data.next);

    const renderLoop = () => {
      this.reView();
      if (!this._tl || this._tl.progress() < 1) {
        requestAnimationFrame(renderLoop);
      }
    };
    requestAnimationFrame(renderLoop);
  }

  moveNext(number_old:number, number_new:number) {
    let _number_old = number_old;
    let _number_new = number_new;
    // if(!number_old){
    //   _number_old = 0
    //   _number_new = 0
    // }
    gsap.to(this.l_mate.uniforms.dispPower, 2.5, {
      value: 1,
      onUpdate: () => {
        this.reView();
      },
      onComplete: () => {
        this.l_mate.uniforms.dispPower.value = 0.0;
        this.changeBackgroundImage(_number_old, _number_new);
        this.reView.bind(this);
        this.__state.animating = false;
      },
    });
  }

  changeBackgroundImage(currentIndex: number, nextIndex: number) {
    if (this.l_mate) {
      this.l_mate.uniforms.texture1.value = this.__textures[currentIndex];
      this.l_mate.uniforms.texture2.value = this.__textures[nextIndex];
    }
  }

  onMouseMove(e: MouseEvent, mouse: THREE.Vector2) {
    e.preventDefault();
    if(!mouse) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    this.l_raycaster.setFromCamera(mouse, this.l_camera);
    const intersects = this.l_raycaster.intersectObjects(this._scene.children, true);
    // intersects確認
    if (intersects.length > 0) {
      this._tl = gsap.timeline();
      intersects.forEach((intersect) => {
          this._tl.to(intersect.object.scale, 1, { x: 2, ease: Expo.easeOut });
          this._tl.to(intersect.object.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
          this._tl.to(intersect.object.position, 0.5, { x: 2, ease: Expo.easeOut });
          this._tl.to(intersect.object.rotation, 0.5, { y: Math.PI * 0.5, ease: Expo.easeOut });
      });
  }
    this.reView();
  }
}
