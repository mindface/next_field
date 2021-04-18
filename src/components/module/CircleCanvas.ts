import * as THREE from "three";
import gsap from "gsap";

export default class Circle {
  private readonly _scene: THREE.Scene;
  private readonly L_camera: any;
  private L_renderer: THREE.WebGLRenderer;

  private __width: number;
  private __height: number;
  private __uniforms: any;
  private __vertex: string;
  private __fragment: string;

  constructor(f_canvas: any) {
    let c_width = 500.0;

    if (window.innerWidth > 1280) {
      c_width = 600.0;
    }

    const ruld = function (u, v) {
      u *= Math.PI;
      v *= 2 * Math.PI;
      let x = 100 * Math.sin(u) * Math.cos(v);
      let y = 100 * Math.sin(u) * Math.sin(v);
      let z = Math.cos(v);
      x -= Math.random() * 50;
      y -= Math.random() * 50;
      z -= Math.random() * 50;

      return new THREE.Vector3(x, y, z);
    };

    this.__width = window.innerWidth;
    this.__height = window.innerHeight;
    this._scene = new THREE.Scene();
    // this.L_camera = new Camera()
    this.L_camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    this.L_camera.position.set(0, 0, 3);
    this.L_camera.lookAt(0, 0, 0);
    this.L_renderer = new THREE.WebGLRenderer({ canvas: f_canvas });
    this.L_renderer.setPixelRatio(window.devicePixelRatio);
    this.L_renderer.setSize(this.__width, this.__height);

    const tgeometry = new THREE.BoxGeometry(1, 1, 1);
    const tmaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const truldBox = new THREE.Mesh(tgeometry, tmaterial);
    this._scene.add(truldBox);

    const geometry = new THREE.ParametricGeometry(ruld, 100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const ruldBox = new THREE.Mesh(geometry, material);
    this._scene.add(ruldBox);

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1).normalize();
    this._scene.add(light);

    this.render();
    // this.loop();
  }

  loop() {
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    this.L_camera.updateProjectionMatrix();
    // this.__renderer.setSize(this.__scene.fog.color,this._height_)
    this.L_renderer.render(this._scene, this.L_camera);
  }
}
