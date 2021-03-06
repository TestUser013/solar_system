import * as THREE from 'three';

import { LightFactory } from './light/MainDirectionalLight';
import { Sun } from './planets/Sun';
import { Earth } from './planets/Earth';
import { BaseSolarSystem } from './BaseSolarSystem';

export class SolarSystem extends BaseSolarSystem {

    protected setup(): void {
        LightFactory.addAmbientMainDirectionalLight(this.scene);

        // const sun: Sun = new Sun();
        // this.scene.add(sun.mesh);
        // this.addAnimation({
        //     subscriber: sun.name,
        //     callback: () => sun.animation(),
        // });

        const earth: Earth = new Earth(this.eventListenersManager);
        this.scene.add(earth.mesh);
        this.scene.add(...earth.additionalMeshes);
        this.addAnimation({
            subscriber: earth.name,
            callback: () => earth.animation(),
        });
    }

}
