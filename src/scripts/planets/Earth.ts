import * as THREE from 'three';
import { BasePlanet } from './BasePlanet';
import { PlanetName } from '../SolarSystemEnums';
import { EventListenersManager } from '../EventListenersManager';

export class Earth extends BasePlanet {

    private rotationDelta: number = 0.005;

    private rotationMeshDelta: number = 0.0045;

    constructor(
        private eventListenersManager: EventListenersManager,
    ) {
        super();
        this.name = PlanetName.Earth;

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(150, 32, 32);

        const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('./images/earthmap10k.webp'),
            specularMap: new THREE.TextureLoader().load('./images/earthspec10k.webp'),
            // normalMap: new THREE.TextureLoader().load('./images/earthnormal2k.jpg'),
            bumpMap: new THREE.TextureLoader().load('./images/earthbump10k.webp'),
            bumpScale: 0.8,
            // normalScale: new THREE.Vector2(2, 3),
            specular: new THREE.Color('grey'),
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.additionalMeshes.push(this.createEarthCloud());
        this.setupEventListeners();
    }

    public animation(): void {
        this.mesh.rotation.y += this.rotationDelta;
        this.additionalMeshes.forEach((mesh: THREE.Mesh) => {
            mesh.rotation.y += this.rotationMeshDelta;
        });
    }

    private setupEventListeners(): void {
        this.eventListenersManager.addEventListener(
            'keypress',
            {
                subscriber: Earth.name,
                callback: (event: KeyboardEvent) => {
                    if (event.key === '+') {
                        this.rotationDelta += 0.001;
                        this.rotationMeshDelta += 0.001;
                    } else if (event.key === '-') {
                        this.rotationDelta -= 0.001;
                        this.rotationMeshDelta -= 0.001;
                    }
                },
            },
        );
    }

    private createEarthCloud(): THREE.Mesh {
        // create destination canvas
        const canvasResult: HTMLCanvasElement = document.createElement('canvas');
        canvasResult.width = 1024;
        canvasResult.height = 512;
        const contextResult: CanvasRenderingContext2D = canvasResult.getContext('2d');

        // load earthcloudmap
        const imageMap: HTMLImageElement = new Image();
        imageMap.addEventListener('load', () => {

            // create dataMap ImageData for earthcloudmap
            const canvasMap: HTMLCanvasElement = document.createElement('canvas');
            canvasMap.width = imageMap.width;
            canvasMap.height = imageMap.height;
            const contextMap: CanvasRenderingContext2D = canvasMap.getContext('2d');
            contextMap.drawImage(imageMap, 0, 0);
            const dataMap: ImageData = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

            // load earthcloudmaptrans
            const imageTrans: HTMLImageElement = new Image();
            imageTrans.addEventListener('load', () => {
                // create dataTrans ImageData for earthcloudmaptrans
                const canvasTrans: HTMLCanvasElement = document.createElement('canvas');
                canvasTrans.width = imageTrans.width;
                canvasTrans.height = imageTrans.height;
                const contextTrans: CanvasRenderingContext2D = canvasTrans.getContext('2d');
                contextTrans.drawImage(imageTrans, 0, 0);
                const dataTrans: ImageData = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);
                // merge dataMap + dataTrans into dataResult
                const dataResult: ImageData = contextMap.createImageData(canvasMap.width, canvasMap.height);
                for (let y = 0, offset = 0; y < imageMap.height; y++) {
                    for (let x = 0; x < imageMap.width; x++, offset += 4) {
                        dataResult.data[offset + 0] = dataMap.data[offset + 0];
                        dataResult.data[offset + 1] = dataMap.data[offset + 1];
                        dataResult.data[offset + 2] = dataMap.data[offset + 2];
                        dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0];
                    }
                }
                // update texture with result
                contextResult.putImageData(dataResult, 0, 0);
                material.map.needsUpdate = true;
            });
            imageTrans.src = './images/earthcloudmaptrans.jpg';
        }, false);
        imageMap.src = './images/earthcloudmap.jpg';

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(155, 128, 128);
        const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(canvasResult),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
        })
        return new THREE.Mesh(geometry, material);
    }

}