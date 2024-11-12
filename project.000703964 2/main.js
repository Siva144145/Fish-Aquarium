import * as THREE from 'https://cdn.skypack.dev/three@0.122.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.122.0/examples/jsm/controls/OrbitControls.js';
import { createScene, createCamera } from '../scene.js';
import { loadModel } from '../modelLoader.js';
import { createWater } from '../water.js';

const scene = createScene();
const camera = createCamera();

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Create water surface
const water = createWater(scene);

// Clock for animation timing
const clock = new THREE.Clock();
let mixer;

loadModel('./models/aquarium/scene.gltf')
    .then(({ scene: model, animations }) => {
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Add the model to the scene
        scene.add(model);

        // Initialize the AnimationMixer
        mixer = new THREE.AnimationMixer(model);

        // Play all animations
        animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
        });
    })
    .catch((error) => {
        console.error('An error occurred while adding the aquarium model to the scene:', error);
    });

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    water.material.uniforms['time'].value += 1.0 / 60.0;
    controls.update();
    renderer.render(scene, camera);
};

animate();
