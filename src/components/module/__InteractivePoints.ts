import * as THREE from "three";
import gsap from "gsap";

export default class InteractivePoints {
  size: {
    w: number,
    h: number,
  };
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  vector: THREE.Vector4;
  geometry: THREE.InstancedBufferGeometry;
  material: THREE.RawShaderMaterial;
  renderer: THREE.WebGLRenderer;
  mesh: THREE.Mesh;
  instances: number;
  positions: number[];
  offsets: number[];
  colors: number[];
  orientationsStart: number[];
  orientationsEnd: number[];
  vertexShader: string;
  fragmentShader: string;

  constructor() {

    this.size = {
      w: window.innerWidth,
      h: window.innerHeight,
    };

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x201919);
    this.camera = new THREE.PerspectiveCamera( 50, this.size.w / this.size.h, 1, 10 );
    this.camera.position.z = 2;

    this.geometry = null;
    this.material = null;
    this.vector = new THREE.Vector4();

    this.renderer = null;
    this.instances = 50000;

    this.positions = [];
    this.offsets = [];
    this.colors = [];
    this.orientationsStart = [];
    this.orientationsEnd = [];

    this.vertexShader = `
      precision highp float;

      uniform float sineTime;

      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;

      attribute vec3 position;
      attribute vec3 offset;
      attribute vec4 color;
      attribute vec4 orientationStart;
      attribute vec4 orientationEnd;

      varying vec3 vPosition;
      varying vec4 vColor;

      void main(){
        vPosition = offset * max( abs( sineTime * 2.0 + 1.0 ), 0.5 ) + position;
        vec4 orientation = normalize( mix( orientationStart, orientationEnd, sineTime ) );
        vec3 vcV = cross( orientation.xyz, vPosition );
        vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );
        vColor = color;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
      }
    `;

    this.fragmentShader = `
      precision highp float;

      uniform float time;

      varying vec3 vPosition;
      varying vec4 vColor;

      void main() {
        vec4 color = vec4( vColor );
        color.r += sin( vPosition.x * 10.0 + time ) * 0.5;
        gl_FragColor = color;
      }
    `;

  }

  init(node: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: node
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.w, this.size.h);

    this.positions.push( 0.025, - 0.025, 0 );
    this.positions.push( - 0.025, 0.025, 0 );
    this.positions.push( 0, 0, 0.025 );

    const vertices = [];
    const orientationsStart = [];
    const orientationsEnd = [];

    for (let index = 0; index < this.instances; index++) {
      this.offsets.push(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
      this.colors.push(Math.random(),Math.random(),Math.random(),Math.random());

      this.vector.set(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1,Math.random()*2-1);
      this.vector.normalize();
      orientationsStart.push(this.vector.x,this.vector.y,this.vector.z,this.vector.w);
      this.vector.set(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1,Math.random()*2-1);
      this.vector.normalize();
      orientationsEnd.push(this.vector.x,this.vector.y,this.vector.z,this.vector.w);
    }

    this.geometry = new THREE.InstancedBufferGeometry();
    this.geometry.instanceCount = this.instances;
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(new Float32Array(this.colors), 4));
    this.geometry.setAttribute('orientationStart', new THREE.InstancedBufferAttribute( new Float32Array(this.orientationsStart), 4));
    this.geometry.setAttribute('orientationEnd', new THREE.InstancedBufferAttribute( new Float32Array(this.orientationsEnd), 4));

    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        sineTime: { value: 1.0 }
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add(this.mesh);

    const tick = () =>  {
      const time = performance.now();
      const object = this.scene.children[0];
      object.rotation.y = time * 0.0005;
      this.renderer.render( this.scene, this.camera );
      requestAnimationFrame(tick);
    }
    tick();

  }

  setUpCamera() {}
}
