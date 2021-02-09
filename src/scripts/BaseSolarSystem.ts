import * as THREE from 'three';
import { AnimationsRequest } from './SolarSystemInterfaces';
import { MainCamera } from './MainCamera';
import { Stars } from './Stars';

export abstract class BaseSolarSystem {

    protected renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    protected scene: THREE.Scene = new THREE.Scene();

    protected mainCamera: MainCamera;

    private animations: AnimationsRequest[] = [];

    constructor() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.setupMainCamera();
        this.animate();
        this.createStars();
        this.setup();
    }

    protected abstract setup(): void;

    public addAnimation(animation: AnimationsRequest): void {
        this.animations.push(animation);
    }

    public deleteAnimation(subscriber: string): void {
        const index: number = this.animations.findIndex((animation: AnimationsRequest) => {
            return animation.subscriber === subscriber;
        });
        this.animations.splice(index, 1);
    }

    private setupMainCamera(): void {
        this.mainCamera = new MainCamera(this, this.scene);
    }

    private createStars(): void {
        this.scene.add(Stars.createStars());
    }

    private resizeRenderer(): void {
        const canvas: HTMLCanvasElement = this.renderer.domElement;
        const isSizeDifferent: boolean = canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight;
        if (!isSizeDifferent) {
            return;
        }
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        this.mainCamera.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.mainCamera.camera.updateProjectionMatrix();
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));
        this.animations.forEach((animation: AnimationsRequest) => {
            animation.callback();
        });
        this.resizeRenderer();
        this.renderer.render(this.scene, this.mainCamera.camera);
    }

}
