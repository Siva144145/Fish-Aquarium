import * as THREE from 'https://cdn.skypack.dev/three@0.122.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.122.0/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function loadModel(path) {
    return new Promise((resolve, reject) => {
        loader.load(
            path,
            (gltf) => {
                resolve({ scene: gltf.scene, animations: gltf.animations });
            },
            undefined,
            (error) => {
                console.error('Error loading the model:', error);
                reject(error);
            }
        );
    });
}
