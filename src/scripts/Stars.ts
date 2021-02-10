import * as THREE from 'three';

export abstract class Stars {

    public static createStars(): THREE.Mesh {
        const texture: THREE.Texture = new THREE.TextureLoader().load('./images/galaxy_starfield.jpg');
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide,
        });
        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(2000, 32, 32);
        const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

}
