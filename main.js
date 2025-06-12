// main.js
import { initScene, scene, camera, renderer, controls } from './scripts/initScene.js';
import { createSofa, createTable, createLamp, createRug, createPlant, createBooks } from './scripts/createProduct.js';
import { addLighting } from './scripts/addLighting.js';
import { initInteraction } from './scripts/interaction.js';
import { startCameraAnimation, stopCameraAnimation, updateCameraAnimation } from './scripts/cameraAnimation.js';
import { createFloor } from './scripts/createEnvironment.js'; // Import environment functions

const canvas = document.getElementById('three-canvas');
initScene(canvas); // initialize the scene
addLighting(scene); // add lighting to the scene

// add floor to the scene
const floor = createFloor();
scene.add(floor);

// add sofa to the scene
const sofa = createSofa();
scene.add(sofa);

// add table to the scene
const table = createTable();
scene.add(table);

// add lamp to the scene
const lamp = createLamp();
scene.add(lamp);

// add rug to the scene
const rug = createRug();
scene.add(rug);

// add plant to the scene
const plant = createPlant();
scene.add(plant);

// add books to the scene
const books = createBooks();
scene.add(books);

// initialize interaction for mouse events
initInteraction(scene, camera, renderer, canvas);

// pause camera auto-rotation when user interacts
controls.addEventListener('start', stopCameraAnimation);
controls.addEventListener('end', startCameraAnimation);

// animation loop for rendering and subtle effects
let pulse = 0;
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // update camera controls
    updateCameraAnimation(camera, controls); // update camera auto-rotation

    // apply pulsing effect to the sofa
    pulse += 0.018;
    const scale = 1 + Math.sin(pulse) * 0.012;
    sofa.scale.set(scale, 1 + Math.abs(Math.sin(pulse) * 0.018), scale);

    renderer.render(scene, camera); // render the scene
}
animate(); // start the animation loop