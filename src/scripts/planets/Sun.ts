import * as THREE from 'three';
import { BasePlanet } from './BasePlanet';
import { PlanetName } from '../SolarSystemEnums';


export class Sun extends BasePlanet {

    constructor () {
        super();
        this.name = PlanetName.Sun;

        const sunSphere = new THREE.SphereGeometry(1121/10,80,80);
        const sunMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 1});
        sunMaterial.color = new THREE.Color("rgb(228, 224, 0)");
        this.mesh = new THREE.Mesh(sunSphere, sunMaterial);

        const sunGlow1Sphere = new THREE.SphereGeometry(1121/9.7,80,80);
        const sunGlow1Material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.3});
        sunGlow1Material.color = new THREE.Color("rgb(255, 214, 0)");

        const sunGlow1 = new THREE.Mesh(sunGlow1Sphere, sunGlow1Material);

        const sunGlow2Sphere = new THREE.SphereGeometry(1121/9.4,80,80);
        const sunGlow2Material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.2});
        sunGlow2Material.color = new THREE.Color("rgb(255, 190, 0)");

        const sunGlow2 = new THREE.Mesh(sunGlow2Sphere, sunGlow2Material);

        const sunGlow3Sphere = new THREE.SphereGeometry(1121/9.1,80,80);
        const sunGlow3Material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.1});
        sunGlow3Material.color = new THREE.Color("rgb(255, 164, 0)");

        const sunGlow3 = new THREE.Mesh(sunGlow3Sphere, sunGlow3Material);

        this.mesh.position.set(0,0,0);
        sunGlow1.position.set(0,0,0);
        sunGlow2.position.set(0,0,0);
        sunGlow3.position.set(0,0,0);

    }

    public animation(): void {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }

}
