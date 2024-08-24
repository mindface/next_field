import * as THREE from "three";

export default class InteractivePoints {
  constructor(props) {
    this.props = props;

    this.size = {
      w: window.innerWidth,
      h: window.innerHeight,
    };

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x201919);
    this.camera = new THREE.PerspectiveCamera(45, this.size.w / this.size.h);

    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
  }

  nextSlide() {
    if (this.state.animating) return;
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.props.f_canvas
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.w, this.size.h);

    this.camera = new THREE.PerspectiveCamera(45, this.size.w / this.size.h);

    let rot = 0;
    const vertices = [];
    const SIZE = 3000;
    const LENGTH = 1000;

    for (let i = 0; i < LENGTH; i++) {
      const x = SIZE * (Math.random() - 0.5);
      const y = SIZE * (Math.random() - 0.5);
      const z = SIZE * (Math.random() - 0.5);

      vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
      size: 10,
      color: 0xffffff,
    });

    const mesh = new THREE.Points(geometry, material);
    this.scene.add(mesh);  

    const tick = () =>  {
      rot += 0.1;
      const radian = (rot * Math.PI) / 180;
      this.camera.position.x = 1000 * Math.sin(radian);
      this.camera.position.z = 1000 * Math.cos(radian);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(tick);
    }
    tick();

  }
}
