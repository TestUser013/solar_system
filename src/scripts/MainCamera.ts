import * as THREE from 'three';
import { BaseSolarSystem } from './BaseSolarSystem';

export class MainCamera extends THREE.PerspectiveCamera {

    constructor(
        private scene: THREE.Scene,
    ) {
        super(50, window.innerWidth / window.innerHeight, 0.1, 4100);
        this.initCameraPosition();
    }

    public initCameraPosition(): void {
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 500;
        this.lookAtScene();
    }

    public isOutOfLimitedSpace(): boolean {
        const polarRadius: number = Math.sqrt(Math.pow(this.position.x, 2) + Math.pow(this.position.y, 2) + Math.pow(this.position.z, 2));
        return polarRadius > 1000 || polarRadius < 160;
    }

    public lookAtScene(): void {
        this.lookAt(this.scene.position);
    }

}
