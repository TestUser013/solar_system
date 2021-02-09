import * as THREE from 'three';
import { AnimationsRequest } from './SolarSystemInterfaces';
import { Stars } from './Stars';

export abstract class BaseSolarSystem {

    protected renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    protected scene: THREE.Scene = new THREE.Scene();

    protected camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );

    private animations: AnimationsRequest[] = [];

    private mouse: {
        x: number;
        y: number;
    } = {
        x: 0,
        y: 0,
    };

    constructor() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.animate();
        this.trackMouseMove();
        this.createStars();
        this.setup();
    }

    protected abstract setup(): void;

    protected addAnimation(animation: AnimationsRequest): void {
        this.animations.push(animation);
    }

    protected deleteAnimation(subscriber: string): void {
        const index: number = this.animations.findIndex((animation: AnimationsRequest) => {
            return animation.subscriber === subscriber;
        });
        this.animations.splice(index, 1);
    }

    private createStars(): void {
        this.scene.add(Stars.createStars());
    }

    private trackMouseMove(): void {
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth ) - 0.5;
            this.mouse.y = (event.clientY / window.innerHeight) - 0.5;
        }, false)
        this.animations.push({
            subscriber: 'mousemove',
            callback: () => {
                this.camera.position.x += (this.mouse.x * 800 - this.camera.position.x) * 0.6;
                this.camera.position.y += (this.mouse.y * 800 - this.camera.position.y) * 0.6;
                this.camera.lookAt(this.scene.position);
            }
        });
    }

    private resizeRenderer(): void {
        const canvas: HTMLCanvasElement = this.renderer.domElement;
        const isSizeDifferent: boolean = canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight;
        if (!isSizeDifferent) {
            return;
        }
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));
        this.animations.forEach((animation: AnimationsRequest) => {
            animation.callback();
        });
        this.resizeRenderer();
        this.renderer.render(this.scene, this.camera);
    }

}
