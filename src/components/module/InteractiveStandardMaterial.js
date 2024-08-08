import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class InteractivePoints {
  constructor(props) {
    this.props = props;

    this.size = {
      w: window.innerWidth,
      h: window.innerHeight,
    };

    this.scene = new THREE.Scene();
    this.sceneL = new THREE.Scene();
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
  }

  nextSlide() {
    if (this.state.animating) return;
  }

  init() {    

    const geometry = new THREE.IcosahedronGeometry( 1, 3 );

    const meshR = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial( { wireframe: true } ) );
    this.scene.add( meshR );

    this.scene.background = new THREE.Color( 0x8FBCD4 );

    this.camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.camera.position.z = 6;

    this.controls = new OrbitControls( this.camera, this.props.f_canvas );

    const light = new THREE.HemisphereLight( 0xffffff, 0x444444, 3 );
    light.position.set( - 2, 2, 2 );
    this.sceneL.add( light.clone() );
    this.scene.add( light.clone() );

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setScissorTest( true );

    const render = () => {
      requestAnimationFrame(render);
      this.scene.rotation.x += 0.00001;

      this.renderer.render(this.scene, this.camera);
    };

    this.renderer.setAnimationLoop( render );
    
    this.renderer = new THREE.WebGL1Renderer({
      canvas: this.props.f_canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.w, this.size.h);

    window.addEventListener( 'resize', this.onWindowResize );
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  setUpLight() {
    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
    pointLight2.position.set(-500, -500, -500);
    this.scene.add(pointLight2);
  }

}
