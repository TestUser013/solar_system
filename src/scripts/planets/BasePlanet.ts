import * as THREE from 'three';
import { PlanetName } from '../SolarSystemEnums';

export abstract class BasePlanet {

    public name: PlanetName = '' as any;

    public mesh: THREE.Mesh;

    public additionalMeshes: THREE.Mesh[] = [];

    public abstract animation(): void;

}
