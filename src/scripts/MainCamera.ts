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

    private movementDelta: number = 5;

    private rotationDelta: number = 0.01;

    private positionLimit: number = 500;

    private hasMousemoveListener: boolean;

    private keyboardControls: {
        [key: string]: string;
    } = {
        "w": "moveForward",
        "s": "moveBack",
        "a": "moveLeft",
        "d": "moveRight",
        "z": "moveUp",
        "x": "moveDown",
        "q": "rotateAroundLeft",
        "e": "rotateAroundRight",
        "ArrowUp": "rotateUp",
        "ArrowDown": "rotateDown",
        "ArrowLeft": "rotateLeft",
        "ArrowRight": "rotateRight",
    };

    constructor(
        private creator: BaseSolarSystem,
        private scene: THREE.Scene,
    ) {
        this.initCameraPosition();
        this.trackMouseMove();
        this.setupCameraControlsToggle();
    }

    public mousemoveEventListener(event: MouseEvent): void {
        this.mouse.x = (event.clientX / window.innerWidth) - 0.5;
        this.mouse.y = (event.clientY / window.innerHeight) - 0.5;
    }

    public keydownEventListener(event: KeyboardEvent): void {
        if (!event.repeat && typeof this[this.keyboardControls[event.key]] === 'function') {
            this.startCameraMovement(event.key);
        }
    }

    public keyupEventListener(event: KeyboardEvent): void {
        if (typeof this[this.keyboardControls[event.key]] === 'function') {
            this.stopCameraMovement(event.key);
        }
    }

    public keypressEventListener(event: KeyboardEvent): void {
        if (event.key === ' ') { // Space
            this.camera.lookAt(this.scene.position);
        }
    }

    private initCameraPosition(): void {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 500;
        this.camera.lookAt(this.scene.position);
    }

    private setupCameraControlsToggle(): void {
        document.querySelector('#camera-toggle').addEventListener('click', () => {
            if (this.hasMousemoveListener) {
                this.stopTrackMouseMove();
                this.trackArrowKeys();
            } else {
                this.trackMouseMove();
                this.stopTrackArrowKeys();
            }
            this.initCameraPosition();
        });
    }

    private trackMouseMove(): void {
        this.hasMousemoveListener = true;
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

    private stopTrackMouseMove(): void {
        this.hasMousemoveListener = false;
        document.removeEventListener('mousemove', this.mousemoveEventListener);
        this.creator.deleteAnimation('mousemove');
    }

    private trackArrowKeys(): void {
        document.addEventListener("keydown", this.keydownEventListener.bind(this));
        document.addEventListener("keyup", this.keyupEventListener.bind(this));
        document.addEventListener("keypress", this.keypressEventListener.bind(this));
    }

    private stopTrackArrowKeys(): void {
        document.removeEventListener("keydown", this.keydownEventListener);
        document.removeEventListener("keyup", this.keyupEventListener);
        document.removeEventListener("keypress", this.keypressEventListener);
    }

    private startCameraMovement(key: string): void {
        this.creator.addAnimation({
            subscriber: key,
            callback: () => this[this.keyboardControls[key]](),
        });
    }

    private stopCameraMovement(key: string): void {
        this.creator.deleteAnimation(key);
    }

    private moveForward(): void {
        if (this.camera.position.z >= -this.positionLimit) {
            this.camera.translateZ(-this.movementDelta);
        }
    }

    private moveBack(): void {
        if (this.camera.position.z <= this.positionLimit) {
            this.camera.translateZ(this.movementDelta);
        }
    }

    private moveLeft(): void {
        if (this.camera.position.x >= -this.positionLimit) {
            this.camera.translateX(-this.movementDelta);
        }
    }

    private moveRight(): void {
        if (this.camera.position.x <= this.positionLimit) {
            this.camera.translateX(this.movementDelta);
        }
    }

    private moveDown(): void {
        if (this.camera.position.y >= -this.positionLimit) {
            this.camera.translateY(-this.movementDelta);
        }
    }

    private moveUp(): void {
        if (this.camera.position.y <= this.positionLimit) {
            this.camera.translateY(this.movementDelta);
        }
    }

    private rotateUp(): void {
        this.camera.rotation.x += this.rotationDelta;
    }

    private rotateDown(): void {
        this.camera.rotation.x -= this.rotationDelta;
    }

    private rotateLeft(): void {
        this.camera.rotation.y += this.rotationDelta;
    }

    private rotateRight(): void {
        this.camera.rotation.y -= this.rotationDelta;
    }

    private rotateAroundLeft(): void {
        this.camera.rotation.z += this.rotationDelta;
    }

    private rotateAroundRight(): void {
        this.camera.rotation.z -= this.rotationDelta;
    }

}
