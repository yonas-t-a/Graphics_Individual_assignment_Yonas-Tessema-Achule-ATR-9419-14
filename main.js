// main.js
import { initScene, scene, camera, renderer, controls } from './scripts/initScene.js';
import { createSofa, createTable, createLamp, createRug, createPlant, createBooks } from './scripts/createProduct.js';
import { addLighting } from './scripts/addLighting.js';
import { initInteraction } from './scripts/interaction.js';
import { startCameraAnimation, stopCameraAnimation, updateCameraAnimation } from './scripts/cameraAnimation.js';
import { createFloor } from './scripts/createEnvironment.js'; // Import environment functions

const canvas = document.getElementById('three-canvas');
initScene(canvas);
addLighting(scene);

// Add floor and skybox
const floor = createFloor();
scene.add(floor);

const sofa = createSofa();
scene.add(sofa);

const table = createTable();
scene.add(table);

const lamp = createLamp();
scene.add(lamp);

const rug = createRug();
scene.add(rug);

// const vase = createVase();
// scene.add(vase);


const plant = createPlant();
scene.add(plant);

const books = createBooks();
scene.add(books);


initInteraction(scene, camera, renderer, canvas);

// Camera auto-rotation pause on user interaction
controls.addEventListener('start', stopCameraAnimation);
controls.addEventListener('end', startCameraAnimation);

// Subtle pulsing/floating animation
let pulse = 0;
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    updateCameraAnimation(camera, controls);
    // Sofa pulsing
    pulse += 0.018;
    const scale = 1 + Math.sin(pulse) * 0.012;
    sofa.scale.set(scale, 1 + Math.abs(Math.sin(pulse) * 0.018), scale);
    renderer.render(scene, camera);
}
animate();