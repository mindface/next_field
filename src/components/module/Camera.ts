import * as THREE from "three";

export default class Camera extends THREE.PerspectiveCamera {
  private _angle: number = 0;
  private _radius: number = 0;

  constructor() {
    super(45, window.innerWidth / window.innerHeight);
    this.position.set(0, 10, 1000);
    // this.lookAt(new THREE.Vector3(0,3,0))
  }

  update() {}
}
