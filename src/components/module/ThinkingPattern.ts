import * as THREE from "three"
import gsap from "gsap"
import { OrbitControls } from './vendor/OrbitControls';
import { TransformControls } from './vendor/TransformControls';
import { timeStamp } from "console";

export default class ThinkingPattern {
  private readonly _scene: THREE.Scene
  private l__camera: THREE.PerspectiveCamera
  private l_renderer: THREE.WebGLRenderer
  private readonly l_loader: THREE.TextureLoader
  private readonly l_mate: THREE.ShaderMaterial
  private readonly l_geom: THREE.BoxBufferGeometry
  private readonly l_image_meshs: THREE.Mesh
  private readonly l_point: THREE.Vector3
  private readonly l_raycaster: THREE.Raycaster

  private readonly l_onUpPosition: THREE.Vector2
  private readonly l_onDownPosition: THREE.Vector2
  private readonly _pointer: THREE.Vector2
  private readonly _addPoint: THREE.Vector2
  private readonly _removePoint: THREE.Vector2
  private readonly _exportSpline: THREE.Vector2

  private readonly transformControl: TransformControls

  private ARC_SEGMENTS:number

  private __width:number
  private __height:number
  private __image_src:any
  private __textures:any
  private __state:any
  private __data:any
  private __positions:Object[]
  private __params:any

  private splines:Object
  private splinePointsLength:number
  private splineHelperObjects:Object[]

  constructor(canvas_element:HTMLCanvasElement){
    
    this._pointer = new THREE.Vector2()
    this._addPoint = new THREE.Vector2()
    this._removePoint = new THREE.Vector2()
    this._exportSpline = new THREE.Vector2()
    this.l_onUpPosition = new THREE.Vector2()
    this.l_onDownPosition = new THREE.Vector2()

    this.l_geom = new THREE.BoxBufferGeometry( 20, 20, 20 )

    this.l_raycaster = new THREE.Raycaster()

    this.__params = {
      uniform: true,
      tension: 0.5,
      centripetal: true,
      chordal: true,
      addPoint: this._addPoint,
      removePoint: this._removePoint,
      exportSpline: this._exportSpline
    };

    this.splinePointsLength = 4
    this.splineHelperObjects = []
    this.__positions = []
    
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color( 0xf0f0f0 );

    this.l__camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    this.l__camera.position.set( 0, 250, 1000 );
    this._scene.add( this.l__camera );

    const light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 1500, 200 );
    light.angle = Math.PI * 0.2;
    light.castShadow = true;
    light.shadow.camera.near = 200;
    light.shadow.camera.far = 2000;
    light.shadow.bias = - 0.000222;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this._scene.add( light );

    const ARC_SEGMENTS = 200;
    this.splines = {};

    const planeGeometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
    planeGeometry.rotateX( - Math.PI / 2 );
    const planeMaterial = new THREE.ShadowMaterial( { opacity: 0.2 } );

    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.y = - 200;
    plane.receiveShadow = true;
    this._scene.add( plane );

    const helper = new THREE.GridHelper( 2000, 100 );
    helper.position.y = - 199;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    this._scene.add( helper );

    this.l_renderer = new THREE.WebGLRenderer();
    this.l_renderer.setPixelRatio( window.devicePixelRatio );
    this.l_renderer.setSize( window.innerWidth, window.innerHeight );
    this.l_renderer.shadowMap.enabled = true;
    canvas_element.appendChild( this.l_renderer.domElement );


    window.addEventListener('load', ()=>{
      const gui = new dat.GUI();
      // gui.add( this.__params, 'uniform' );
      // gui.add( this.__params, 'tension', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
      //   this.splines.uniform.tension = value;
      //   this.updateSplineOutline();
      // } );
      gui.add( this.__params, 'centripetal' );
      gui.add( this.__params, 'chordal' );
      gui.add( this.__params, 'addPoint' );
      gui.add( this.__params, 'removePoint' );
      gui.add( this.__params, 'exportSpline' );
      gui.open();
    })

    const controls = new OrbitControls( this.l__camera,this.l_renderer.domElement);
    controls.damping = 0.2;
    controls.addEventListener( 'change', () => { this.render() });

    this.transformControl = new TransformControls( this.l__camera, this.l_renderer.domElement );
    this.transformControl.addEventListener( 'dragging-changed',  ( event ) => {
      controls.enabled = ! event.value;
    } );
    this._scene.add( this.transformControl );

    this.transformControl.addEventListener( 'objectChange',  () => {
      this.updateSplineOutline();
    } );

    document.addEventListener( 'pointerdown', (e) => { this.onPointerDown(e)}, false );
    document.addEventListener( 'pointerup', (e) => { this.onPointerUp(e)}, false );
    document.addEventListener( 'pointermove', (e) => { this.onPointerMove(e) },false);

    for ( let i = 0; i < this.splinePointsLength; i ++ ) {
      this.addSplineObject( this.__positions[ i ] );
    }

    const geometry = new THREE.BufferGeometry();
				geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( this.ARC_SEGMENTS * 3 ), 3 ) );

				let curve = new THREE.CatmullRomCurve3( this.__positions );
				curve.curveType = 'catmullrom';
				curve.mesh = new THREE.Line( geometry.clone(), new THREE.LineBasicMaterial( {
					color: 0xff0000,
					opacity: 0.35
				} ) );
				curve.mesh.castShadow = true;
				this.splines.uniform = curve;

				curve = new THREE.CatmullRomCurve3( this.__positions );
				curve.curveType = 'centripetal';
				curve.mesh = new THREE.Line( geometry.clone(), new THREE.LineBasicMaterial( {
					color: 0x00ff00,
					opacity: 0.35
				} ) );
				curve.mesh.castShadow = true;
				this.splines.centripetal = curve;

				curve = new THREE.CatmullRomCurve3( this.__positions );
				curve.curveType = 'chordal';
				curve.mesh = new THREE.Line( geometry.clone(), new THREE.LineBasicMaterial( {
					color: 0x0000ff,
					opacity: 0.35
				} ) );
				curve.mesh.castShadow = true;
				this.splines.chordal = curve;

				for ( const k in this.splines ) {

					const spline = this.splines[ k ];
					this._scene.add( spline.mesh );

				}

				this.load( [ new THREE.Vector3( 289.76843686945404, 452.51481137238443, 56.10018915737797 ),
					new THREE.Vector3( - 53.56300074753207, 171.49711742836848, - 14.495472686253045 ),
					new THREE.Vector3( - 91.40118730204415, 176.4306956436485, - 6.958271935582161 ),
					new THREE.Vector3( - 383.785318791128, 491.1365363371675, 47.869296953772746 ) ] );


    const animate = () => {
      requestAnimationFrame( animate );
      this.render()
    }
    animate()

  }


  render() {
    this.splines.uniform.mesh.visible = this.__params.uniform;
    this.splines.centripetal.mesh.visible = this.__params.centripetal;
    this.splines.chordal.mesh.visible = this.__params.chordal;
    this.l_renderer.render( this._scene, this.l__camera );
  }

 exportSpline() {

    const strplace = [];

    for ( let i = 0; i < this.splinePointsLength; i ++ ) {

      const p = this.splineHelperObjects[ i ].position;
      strplace.push( `new THREE.Vector3(${p.x}, ${p.y}, ${p.z})` );

    }

    console.log( strplace.join( ',\n' ) );
    const code = '[' + ( strplace.join( ',\n\t' ) ) + ']';
    prompt( 'copy and paste code', code );

  }

  load( new_positions ) {
    while ( new_positions.length > this.__positions.length ) {
      this.addPoint();
    }
    while ( new_positions.length < this.__positions.length ) {
      this.removePoint();
    }
    for ( let i = 0; i < this.__positions.length; i ++ ) {
      this.__positions[ i ].copy( new_positions[ i ] );
    }
    this.updateSplineOutline();
  }

  updateSplineOutline(){
    for ( const k in this.splines ) {
      const spline = this.splines[ k ];
      const splineMesh = spline.mesh;
      const position = splineMesh.geometry.attributes.position;
      for ( let i = 0; i < this.ARC_SEGMENTS; i ++ ) {
        const t = i / ( this.ARC_SEGMENTS - 1 );
        spline.getPoint( t, this.l_point );
        position.setXYZ( i, this.l_point.x, this.l_point.y, this.l_point.z );
      }
      position.needsUpdate = true;
    }
  }

  addSplineObject(position){
    const material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );
    const object = new THREE.Mesh( this.l_geom , material );

    if ( position ) {

      object.position.copy( position );

    } else {

      object.position.x = Math.random() * 1000 - 500;
      object.position.y = Math.random() * 600;
      object.position.z = Math.random() * 800 - 400;

    }

    object.castShadow = true;
    object.receiveShadow = true;
    this._scene.add( object );
    this.splineHelperObjects.push( object );
    return object;
  }

  addPoint(){
    this.splinePointsLength ++;
    this.__positions.push( this.addSplineObject().position );
    this.updateSplineOutline();
  }

  removePoint(){
    if ( this.splinePointsLength <= 4 ) {
      return;
    }
    const point = this.splineHelperObjects.pop();
    this.splinePointsLength --;
    this.__positions.pop();

    if ( this.ransformControl.object === point ) this.transformControl.detach();
    this._scene.remove( this.l_point );

    this.updateSplineOutline();
  }

  onPointerDown( event ) {
    this.l_onDownPosition.x = event.clientX;
    this.l_onDownPosition.y = event.clientY;
  }

  onPointerUp( event ) {
    this.l_onUpPosition.x = event.clientX;
    this.l_onUpPosition.y = event.clientY;

    if ( this.l_onDownPosition.distanceTo( this.l_onUpPosition ) === 0 ) this.transformControl.detach();
  }

  onPointerMove( event ) {
    this._pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this._pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.l_raycaster.setFromCamera( this._pointer, this.l__camera );

    const intersects = this.l_raycaster.intersectObjects( this.splineHelperObjects );

    if ( intersects.length > 0 ) {
      const object = intersects[ 0 ].object;
      if ( object !== this.transformControl.object ) {
        this.transformControl.attach( object );
      }
    }
  }


}
