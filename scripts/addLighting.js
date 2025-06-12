// Adds ambient, directional, and spotlight to the scene
import * as THREE from 'three';

function addLighting(scene) {
    // Ambient light
    // Provides uniform illumination across the scene without casting shadows
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // Directional light
    // Simulates sunlight, casts shadows, and adds depth to the scene
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7); // Position the light source
    dirLight.castShadow = true; // Enable shadow casting
    dirLight.shadow.mapSize.width = 1024; // Set shadow map resolution
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 1; // Set shadow camera near clipping plane
    dirLight.shadow.camera.far = 30; // Set shadow camera far clipping plane
    dirLight.shadow.camera.left = -8; // Define shadow camera bounds
    dirLight.shadow.camera.right = 8;
    dirLight.shadow.camera.top = 8;
    dirLight.shadow.camera.bottom = -8;
    scene.add(dirLight);
}

export { addLighting };