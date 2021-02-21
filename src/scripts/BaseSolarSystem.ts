import * as THREE from 'three';
import { AnimationsRequest } from './SolarSystemInterfaces';
import { EventListenersManager } from './EventListenersManager';
import { MainCamera } from './MainCamera';
import { MovementController } from './MovementController';
import { Stars } from './Stars';

export abstract class BaseSolarSystem {

    private animations: AnimationsRequest[] = [];

    protected renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    protected scene: THREE.Scene = new THREE.Scene();

    protected mainCamera: MainCamera;

    protected movementController: MovementController;

    protected eventListenersManager: EventListenersManager;

    constructor() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.setupServices();
        this.setupMainCamera();
        this.setupMovementController();
        this.animate();
        this.createStars();
        this.setup();
    }

    public addAnimation(animation: AnimationsRequest): void {
        if (this.animations.every((anim: AnimationsRequest) => anim.subscriber !== animation.subscriber)) {
            this.animations.push(animation);
        }
    }

    public deleteAnimation(subscriber: string): void {
        const index: number = this.animations.findIndex((animation: AnimationsRequest) => {
            return animation.subscriber === subscriber;
        });
        if (index !== -1) {
            this.animations.splice(index, 1);
        }
    }

    private setupServices(): void {
        this.eventListenersManager = new EventListenersManager();
    }

    private setupMainCamera(): void {
        this.mainCamera = new MainCamera(this.scene);
    }

    private setupMovementController(): void {
        this.movementController = new MovementController(
            this,
            this.eventListenersManager,
            this.mainCamera
        );
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
        this.mainCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.mainCamera.updateProjectionMatrix();
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));
        this.animations.forEach((animation: AnimationsRequest) => {
            animation.callback();
        });
        this.resizeRenderer();
        this.renderer.render(this.scene, this.mainCamera);
    }

    protected abstract setup(): void;

}
