import * as THREE from 'three';
import { BasePlanet } from './BasePlanet';
import { PlanetName } from '../SolarSystemEnums';


export class Earth extends BasePlanet {

    constructor() {
        super();
        this.name = PlanetName.Earth;

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(150, 64, 64);

        const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('images/earthmap2k.jpg'),
            specularMap: new THREE.TextureLoader().load('images/earthspec2k.jpg'),
            normalMap: new THREE.TextureLoader().load('images/earthnormal2k.jpg'),
            normalScale: new THREE.Vector2(2, 3),
            specular: new THREE.Color('grey'),
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.additionalMeshes.push(this.createEarthCloud());
    }

    private createEarthCloud(): THREE.Mesh {
        // create destination canvas
        const canvasResult: HTMLCanvasElement = document.createElement('canvas');
        canvasResult.width = 1024;
        canvasResult.height = 512;
        const contextResult: CanvasRenderingContext2D = canvasResult.getContext('2d');

        // load earthcloudmap
        const imageMap = new Image();
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
            imageTrans.addEventListener("load", () => {
                // create dataTrans ImageData for earthcloudmaptrans
                const canvasTrans: HTMLCanvasElement = document.createElement('canvas');
                canvasTrans.width = imageTrans.width;
                canvasTrans.height = imageTrans.height;
                const contextTrans: CanvasRenderingContext2D = canvasTrans.getContext('2d');
                contextTrans.drawImage(imageTrans, 0, 0);
                const dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);
                // merge dataMap + dataTrans into dataResult
                const dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height);
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

        const geometry = new THREE.SphereGeometry(155, 64, 64)
        const material = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(canvasResult),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
        })
        return new THREE.Mesh(geometry, material);
    }

    public animation(): void {
        // this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.005;
        this.additionalMeshes.forEach((mesh: THREE.Mesh) => {
            mesh.rotation.y += 0.0045;
        });
    }

}