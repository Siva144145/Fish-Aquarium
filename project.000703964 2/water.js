import * as THREE from 'https://cdn.skypack.dev/three@0.122.0/build/three.module.js';
import { Water } from 'https://cdn.skypack.dev/three@0.122.0/examples/jsm/objects/Water.js';

export function createWater(scene) {
    const waterGeometry = new THREE.PlaneGeometry(1.75, 1.75);

    const waterNormals = new THREE.TextureLoader().load('textures/waternormals.jpg', (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    });

    const water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 1.5,
        fog: scene.fog !== undefined,
    });

    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.25; // Position the water inside the aquarium box
    scene.add(water);

    return water;
}
