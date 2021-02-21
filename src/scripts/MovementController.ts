import { BaseSolarSystem } from './BaseSolarSystem';
import { MainCamera } from './MainCamera';
import { InfoPanelController } from './InfoPanelController';
import { EventListenersManager } from './EventListenersManager';

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
        private eventListenersManager: EventListenersManager,
        private camera: MainCamera,
    ) {
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

    private setupCameraControls(): void {
        this.trackMouseMove();
        this.infoPanels.forEach((panel: InfoPanelController) => {
            panel.hide();
        });

        this.eventListenersManager.addEventListener(
            'keypress',
            {
                subscriber: MovementController.name,
                callback: this.keypressEventListener.bind(this),
            },
        );
    }

    private setupInfoPanels(): void {
        this.infoPanels.push(new InfoPanelController('.info-movement'));
        this.infoPanels.push(new InfoPanelController('.info-rotation'));
    }

    private trackMouseMove(): void {
        this.hasMousemoveListener = true;

        this.eventListenersManager.addEventListener(
            'mousemove',
            {
                subscriber: MovementController.name,
                callback: this.mousemoveEventListener.bind(this),
            },
        );

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

        this.eventListenersManager.removeEventListener('mousemove', MovementController.name);

        this.creator.deleteAnimation('mousemove');
    }

    private trackArrowKeys(): void {
        this.eventListenersManager.addEventListener(
            'keydown',
            {
                subscriber: MovementController.name,
                callback: this.keydownEventListener.bind(this),
            },
        );

        this.eventListenersManager.addEventListener(
            'keyup',
            {
                subscriber: MovementController.name,
                callback: this.keyupEventListener.bind(this),
            },
        );
    }

    private stopTrackArrowKeys(): void {
        Object.keys(this.keyboardControls).forEach((key: string) => {
            this.creator.deleteAnimation(key);
        });
        this.eventListenersManager.removeEventListener('keydown', MovementController.name);
        this.eventListenersManager.removeEventListener('keyup', MovementController.name);
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
