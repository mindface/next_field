import * as THREE from "three";
import gsap from "gsap";

export default class InteractivePoints {
  constructor(props) {
    this.props = props;

    this.size = {
      w: window.innerWidth,
      h: window.innerHeight,
    };

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.camera = null;

    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.geometry = null;
    this.material = null;
    this.particles = null;

    this.renderer = null;
    this.raycaster = null;
    this.intersects = null;
    this.meshs = null;
    this.mouse = new THREE.Vector2();
    this.INTERSECTED = "";
    this.mouseX = 0;
    this.mouseY = 0;
    this.PARTICLE_SIZE = 20;

    this.vertex = `
      attribute float size;
      attribute vec3 customColor;

      varying vec3 vColor;

      void main() {

        vColor = customColor;

        vec4 mvPosition = modelViewMatrix * vec4( position, 0.8 );

        gl_PointSize = size * ( 200.0 / -mvPosition.z );

        gl_Position = projectionMatrix * mvPosition;

      }
    `;

    this.fragment = `
      uniform vec3 color;
      uniform sampler2D pointTexture;

      varying vec3 vColor;

      void main() {

        gl_FragColor = vec4( color * vColor, 10.0 );

        gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

        if ( gl_FragColor.a < ALPHATEST ) discard;

      }
    `;
  }

  nextSlide() {
    if (this.state.animating) return;
  }

  init() {
    this.setUpSize();
    this.setUpCamera();
    // this.setUpLight()

    const vertices = new THREE.BoxGeometry(300, 300, 300, 12, 12, 12).vertices;
    const positions = new Float32Array(vertices.length * 3);
    const colors = new Float32Array(vertices.length * 3);
    const sizes = new Float32Array(vertices.length);

    let vertex;
    const color = new THREE.Color();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    for (let i = 0, l = vertices.length; i < l; i++) {
      vertex = vertices[i];
      vertex.toArray(positions, i * 3);

      color.setHSL(0.01 + 0.1 * (i / l), 1.0, 0.5);
      color.toArray(colors, i * 3);

      sizes[i] = this.PARTICLE_SIZE * 0.5;
    }

    this.geometry = new THREE.BufferGeometry(100, 100, 100);
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute(
      "customColor",
      new THREE.BufferAttribute(colors, 3)
    );
    this.geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // const material = new THREE.MeshNormalMaterial()
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        pointTexture: { value: new THREE.TextureLoader().load("/disc.png") },
      },
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
      alphaTest: 0.9,
    });

    for (let index = 0; index < 6; index++) {
      this.particles = new THREE.Points(this.geometry, material);
      this.particles.position.set(300 - 100 * index, 100 * index, 0);
      this.scene.add(this.particles);
    }

    this.meshs = new THREE.Mesh(this.geometry, material);
    this.scene.add(this.meshs);
    // this.meshs.position.x = 1000
    this.scene.add(this.meshs);

    const amount = 200;
    let object,
      parent = this.meshs;

    this.renderer = new THREE.WebGL1Renderer({
      canvas: this.props.f_canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.w, this.size.h);

    document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    window.addEventListener("resize", this.onWindowResize, false);

    const render = () => {
      requestAnimationFrame(render);
      const time = Date.now() * 0.001 + 10000;

      const rx = Math.sin(time * 0.7) * 200;
      const ry = Math.sin(time * 0.3) * 100;
      const rz = Math.sin(time * 0.2) * 1;

      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;

      this.camera.lookAt(this.scene.position);

      // this.meshs.traverse( function ( object ) {

      //   object.rotation.x = rx;
      //   object.rotation.y = ry;
      //   object.rotation.z = rz;

      // });

      this.particles.rotation.x += 0.0005;
      this.particles.rotation.y += 0.001;
      this.addCtxText(this.props.f_canvas);

      // this.geometry = this.particles.geometry;
      // const attributes = this.geometry.attributes;

      // this.raycaster.setFromCamera( this.mouse, this.camera );

      // this.intersects = this.raycaster.intersectObject( this.particles );

      // if ( this.intersects.length > 0 ) {

      //   if ( this.INTERSECTED != this.intersects[ 0 ].index ) {

      //     attributes.size.array[ this.INTERSECTED ] = this.PARTICLE_SIZE;

      //     this.INTERSECTED = this.intersects[ 0 ].index;

      //     attributes.size.array[ this.INTERSECTED ] = this.PARTICLE_SIZE * 1.25;
      //     attributes.size.needsUpdate = true;

      //   }

      // } else if ( this.INTERSECTED !== null ) {

      //   attributes.size.array[ this.INTERSECTED ] = this.PARTICLE_SIZE;
      //   attributes.size.needsUpdate = true;
      //   this.INTERSECTED = null;

      // }

      this.renderer.render(this.scene, this.camera);
    };
    render();
  }

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = this.size.w / this.size.h;
    this.camera.updateProjectionMatrix();

    renderer.setSize(this.size.w, this.size.h);
  }

  onDocumentMouseMove(event) {
    this.mouseX = (event.clientX - this.windowHalfX) * 10;
    this.mouseY = (event.clientY - this.windowHalfY) * 10;
  }

  setUpLight() {
    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
    pointLight2.position.set(-500, -500, -500);
    this.scene.add(pointLight2);
  }

  addCtxText(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.font = "48px serif";
    ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
    ctx.fillText("Hello world", 10, 50);
  }

  setUpSize() {
    this.size = {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  }

  setUpCamera() {
    this.camera = new THREE.PerspectiveCamera(
      145,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 250;
  }
}
