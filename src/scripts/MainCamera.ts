import * as THREE from 'three';
import { BaseSolarSystem } from './BaseSolarSystem';

export class MainCamera {

    public camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );

    private mouse: {
        x: number;
        y: number;
    } = {
        x: 0,
        y: 0,
    };

    constructor(
        private creator: BaseSolarSystem,
        private scene: THREE.Scene,
    ) {
        this.initCameraPosition();
        this.trackMouseMove();
    }

    public mousemoveEventListener(event: MouseEvent): void {
        this.mouse.x = (event.clientX / window.innerWidth) - 0.5;
        this.mouse.y = (event.clientY / window.innerHeight) - 0.5;
    }

    private initCameraPosition(): void {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 500;
        this.camera.lookAt(this.scene.position);
    }

    private trackMouseMove(): void {
        document.addEventListener('mousemove', this.mousemoveEventListener.bind(this), false)
        this.creator.addAnimation({
            subscriber: 'mousemove',
            callback: () => {
                this.camera.position.x += (this.mouse.x * 1000 - this.camera.position.x) * 0.6;
                this.camera.position.y += (this.mouse.y * 1000 - this.camera.position.y) * 0.6;
                this.camera.lookAt(this.scene.position);
            }
        });
    }

}
