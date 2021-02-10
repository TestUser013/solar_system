import * as THREE from 'three';
import { BaseSolarSystem } from './BaseSolarSystem';

export class MainCamera extends THREE.PerspectiveCamera {

    private mouse: {
        x: number;
        y: number;
    } = {
        x: 0,
        y: 0,
    };

    private movementDelta: number = 5;

    private rotationDelta: number = 0.01;

    private hasMousemoveListener: boolean;

    private keyboardControls: {
        [key: string]: string;
    } = {
        'w': 'moveForward',
        's': 'moveBack',
        'a': 'moveLeft',
        'd': 'moveRight',
        'z': 'moveUp',
        'x': 'moveDown',
        'q': 'rotateAroundLeft',
        'e': 'rotateAroundRight',
        'ArrowUp': 'rotateUp',
        'ArrowDown': 'rotateDown',
        'ArrowLeft': 'rotateLeft',
        'ArrowRight': 'rotateRight',
    };

    constructor(
        private creator: BaseSolarSystem,
        private scene: THREE.Scene,
    ) {
        super(50, window.innerWidth / window.innerHeight, 0.1, 4100);
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
        if (event.key === 'c') {
            this.lookAt(this.scene.position);
        }
    }

    private initCameraPosition(): void {
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 500;
        this.lookAt(this.scene.position);
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
        document.addEventListener('mousemove', this.mousemoveEventListener.bind(this), false);
        this.creator.addAnimation({
            subscriber: 'mousemove',
            callback: () => {
                this.position.x += (this.mouse.x * 1000 - this.position.x) * 0.6;
                this.position.y += (this.mouse.y * 1000 - this.position.y) * 0.6;
                this.lookAt(this.scene.position);
            },
        });
    }

    private stopTrackMouseMove(): void {
        this.hasMousemoveListener = false;
        document.removeEventListener('mousemove', this.mousemoveEventListener.bind(this));
        this.creator.deleteAnimation('mousemove');
    }

    private trackArrowKeys(): void {
        document.addEventListener('keydown', this.keydownEventListener.bind(this));
        document.addEventListener('keyup', this.keyupEventListener.bind(this));
        document.addEventListener('keypress', this.keypressEventListener.bind(this));
    }

    private stopTrackArrowKeys(): void {
        document.removeEventListener('keydown', this.keydownEventListener.bind(this));
        document.removeEventListener('keyup', this.keyupEventListener.bind(this));
        document.removeEventListener('keypress', this.keypressEventListener.bind(this));
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

    private isOutOfLimitedSpace(): boolean {
        const polarRadius: number = Math.sqrt(Math.pow(this.position.x, 2) + Math.pow(this.position.y, 2) + Math.pow(this.position.z, 2));
        return polarRadius > 1000 || polarRadius < 160;
    }

    private moveForward(): void {
        this.translateZ(-this.movementDelta);
        if (this.isOutOfLimitedSpace()) {
            this.moveBack();
        }
    }

    private moveBack(): void {
        this.translateZ(this.movementDelta);
        if (this.isOutOfLimitedSpace()) {
            this.moveForward();
        }
    }

    private moveLeft(): void {
        this.translateX(-this.movementDelta);
        if (this.isOutOfLimitedSpace()) {
            this.moveRight();
        }
    }

    private moveRight(): void {
        this.translateX(this.movementDelta);
        if (this.isOutOfLimitedSpace()) {
            this.moveLeft();
        }
    }

    private moveDown(): void {
        this.translateY(-this.movementDelta);
        if (this.isOutOfLimitedSpace()) {
            this.moveUp();
        }
    }

    private moveUp(): void {
        this.translateY(this.movementDelta);
        if (this.isOutOfLimitedSpace()) {
            this.moveDown();
        }
    }

    private rotateUp(): void {
        this.rotateX(this.rotationDelta);
    }

    private rotateDown(): void {
        this.rotateX(-this.rotationDelta);
    }

    private rotateLeft(): void {
        this.rotateY(this.rotationDelta);
    }

    private rotateRight(): void {
        this.rotateY(-this.rotationDelta);
    }

    private rotateAroundLeft(): void {
        this.rotateZ(this.rotationDelta);
    }

    private rotateAroundRight(): void {
        this.rotateZ(-this.rotationDelta);
    }

}
