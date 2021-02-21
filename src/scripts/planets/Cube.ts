import * as THREE from 'three';
import { BasePlanet } from './BasePlanet';
import { PlanetName } from '../SolarSystemEnums';

export class Cube extends BasePlanet {

    constructor () {
        super();
        this.name = PlanetName.Sun;

        const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 2);
        const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
        });
        this.mesh = new THREE.Mesh(geometry, material);
    }

    public animation(): void {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }

}
