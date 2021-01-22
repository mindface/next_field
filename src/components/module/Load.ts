import * as THREE from "three"
import gsap from "gsap"

export default class Load {
  private readonly _scene: THREE.Scene
  private readonly L_camera: any
  private L_renderer: THREE.WebGLRenderer

  private __width:number
  private __height:number
  private __uniforms:any
  private __vertex:string
  private __fragment:string

  constructor(f_canvas:any){

    this.__vertex = `
    void main()	{
     gl_Position = vec4( position, 1.0 );
    }`

    this.__fragment = `
    precision mediump float;

    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;

    void main(void)
    {

      float glowT = sin(time) * 2.5 + 0.5;
      float glowZ = cos(time) * 0.5 + 0.5;

      vec3 d = vec3(0.0);
      vec2 p2 = ( gl_FragCoord.xy * 1.4 - (resolution + 500.0) ) / min(resolution.x, resolution.y);
      float f = 0.01 / abs(length(p2) - 0.8+(glowZ*0.6));

      gl_FragColor += vec4(vec3(f),1.3);

    }`

    this.__width = window.innerWidth
    this.__height = window.innerHeight
    this._scene = new THREE.Scene()
    // this.L_camera = new Camera()
    this.L_camera = new THREE.PerspectiveCamera(45,this.__width / this.__height)
    this.L_camera.position.set(0,10,1000)
    this.L_renderer = new THREE.WebGLRenderer({canvas: f_canvas})
    this.L_renderer.setPixelRatio(window.devicePixelRatio)
    this.L_renderer.setSize(this.__width,this.__height)

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0,0,0)
    mesh.rotation.set(10,10,10)
    this._scene.add( mesh );

    const geometry_ = new THREE.PlaneBufferGeometry( 2, 2 );
    this.__uniforms = {
      time: { type:"f",value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mouse: { type: "v2", value: new THREE.Vector2() }
    };
    this.__uniforms['resolution']['value']['x'] = this.__width
    this.__uniforms['resolution']['value']['y'] = this.__height
    this._scene.fog = new THREE.Fog( 0x050505, 200, 1000 );
    this._scene.add( new THREE.AmbientLight(0x050505) )

    const material_ = new THREE.ShaderMaterial( {
      uniforms: this.__uniforms,
      vertexShader: this.__vertex,
      fragmentShader: this.__fragment
    });
    const mesh_ = new THREE.Mesh( geometry_, material_ );
    this._scene.add( mesh_ );

    this.render();
    this.loop();
    
  }

 loop(){
   this.render()
   requestAnimationFrame(this.loop.bind(this))
 }

 render(){
      this.__uniforms[ 'time' ].value = performance.now() / 1000;
      this.L_camera.updateProjectionMatrix()
      // this.__renderer.setSize(this.__scene.fog.color,this._height_)
      this.L_renderer.render(this._scene,this.L_camera)
 }

}
