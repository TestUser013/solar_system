import * as THREE from 'three';


export class LightFactory {

    public static createMainDirectionalLight(): THREE.DirectionalLight {
        const color: number = 0xFFFFFF;
        const intensity: number = 1;
        const light: THREE.DirectionalLight = new THREE.DirectionalLight(color, intensity);
        light.position.set(-6, 2, 4);
        return light;
    }

    public static addAmbientMainDirectionalLight(scene: THREE.Scene): void {
        const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0x222222, 1);
        const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xcccccc, 0.8);
        directionalLight.position.set(5, 5, 5);

        directionalLight.castShadow = true;
        directionalLight.shadow.camera.near = 0.001;
        directionalLight.shadow.camera.far = 150;

        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;

        directionalLight.shadow.bias = 0.1;

        directionalLight.shadow.mapSize.width = 1024 * 4;
        directionalLight.shadow.mapSize.height = 1024 * 4;

        scene.add(ambientLight);
        scene.add(directionalLight);
    }

}