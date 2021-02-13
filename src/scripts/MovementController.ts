import { BaseSolarSystem } from './BaseSolarSystem';
import { MainCamera } from './MainCamera';
import { InfoPanelController } from './InfoPanelController';

export class MovementController {

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

    private mouse: {
        x: number;
        y: number;
    } = {
        x: 0,
        y: 0,
    };

    private infoPanels: InfoPanelController[] = [];

    constructor(
        private creator: BaseSolarSystem,
        private camera: MainCamera,
    ) {
        this.bindEventListeners();
        this.setupInfoPanels();
        this.setupCameraControls();
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
            this.camera.lookAtScene();
        } else if (event.key === 'g') {
            if (this.hasMousemoveListener) {
                this.stopTrackMouseMove();
                this.trackArrowKeys();
                this.infoPanels.forEach((panel: InfoPanelController) => {
                    panel.show();
                });
            } else {
                this.trackMouseMove();
                this.stopTrackArrowKeys();
                this.infoPanels.forEach((panel: InfoPanelController) => {
                    panel.hide();
                });
            }
            this.camera.initCameraPosition();
        };
    }

    public mousemoveEventListener(event: MouseEvent): void {
        this.mouse.x = (event.clientX / window.innerWidth) - 0.5;
        this.mouse.y = (event.clientY / window.innerHeight) - 0.5;
    }

    private bindEventListeners(): void {
        this.keyupEventListener = this.keyupEventListener.bind(this);
        this.keydownEventListener = this.keydownEventListener.bind(this);
        this.keypressEventListener = this.keypressEventListener.bind(this);
        this.mousemoveEventListener = this.mousemoveEventListener.bind(this);
    }

    private setupCameraControls(): void {
        this.trackMouseMove();
        this.infoPanels.forEach((panel: InfoPanelController) => {
            panel.hide();
        });

        document.addEventListener('keypress', this.keypressEventListener);
    }

    private setupInfoPanels(): void {
        this.infoPanels.push(new InfoPanelController('.info-movement'));
        this.infoPanels.push(new InfoPanelController('.info-rotation'));
    }

    private trackMouseMove(): void {
        this.hasMousemoveListener = true;
        document.addEventListener('mousemove', this.mousemoveEventListener, false);
        this.creator.addAnimation({
            subscriber: 'mousemove',
            callback: () => {
                this.camera.position.x += (this.mouse.x * 1000 - this.camera.position.x) * 0.6;
                this.camera.position.y += (this.mouse.y * 1000 - this.camera.position.y) * 0.6;
                this.camera.lookAtScene();
            },
        });
    }

    private stopTrackMouseMove(): void {
        this.hasMousemoveListener = false;
        document.removeEventListener('mousemove', this.mousemoveEventListener);
        this.creator.deleteAnimation('mousemove');
    }

    private trackArrowKeys(): void {
        document.addEventListener('keydown', this.keydownEventListener);
        document.addEventListener('keyup', this.keyupEventListener);
    }

    private stopTrackArrowKeys(): void {
        Object.keys(this.keyboardControls).forEach((key: string) => {
            this.creator.deleteAnimation(key);
        });
        document.removeEventListener('keydown', this.keydownEventListener);
        document.removeEventListener('keyup', this.keyupEventListener);
    }

    private startCameraMovement(key: string): void {
        this.infoPanels.forEach((panel: InfoPanelController) => {
            panel.highlight(key);
        });
        this.creator.addAnimation({
            subscriber: key,
            callback: () => this[this.keyboardControls[key]](),
        });
    }

    private stopCameraMovement(key: string): void {
        this.infoPanels.forEach((panel: InfoPanelController) => {
            panel.trivialize(key);
        });
        this.creator.deleteAnimation(key);
    }

    private moveForward(): void {
        this.camera.translateZ(-this.movementDelta);
        if (this.camera.isOutOfLimitedSpace()) {
            this.moveBack();
        }
    }

    private moveBack(): void {
        this.camera.translateZ(this.movementDelta);
        if (this.camera.isOutOfLimitedSpace()) {
            this.moveForward();
        }
    }

    private moveLeft(): void {
        this.camera.translateX(-this.movementDelta);
        if (this.camera.isOutOfLimitedSpace()) {
            this.moveRight();
        }
    }

    private moveRight(): void {
        this.camera.translateX(this.movementDelta);
        if (this.camera.isOutOfLimitedSpace()) {
            this.moveLeft();
        }
    }

    private moveDown(): void {
        this.camera.translateY(-this.movementDelta);
        if (this.camera.isOutOfLimitedSpace()) {
            this.moveUp();
        }
    }

    private moveUp(): void {
        this.camera.translateY(this.movementDelta);
        if (this.camera.isOutOfLimitedSpace()) {
            this.moveDown();
        }
    }

    private rotateUp(): void {
        this.camera.rotateX(this.rotationDelta);
    }

    private rotateDown(): void {
        this.camera.rotateX(-this.rotationDelta);
    }

    private rotateLeft(): void {
        this.camera.rotateY(this.rotationDelta);
    }

    private rotateRight(): void {
        this.camera.rotateY(-this.rotationDelta);
    }

    private rotateAroundLeft(): void {
        this.camera.rotateZ(this.rotationDelta);
    }

    private rotateAroundRight(): void {
        this.camera.rotateZ(-this.rotationDelta);
    }

}
