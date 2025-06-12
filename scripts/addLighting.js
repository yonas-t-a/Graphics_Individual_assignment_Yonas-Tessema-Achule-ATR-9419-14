// Adds ambient and directional lighting to the scene for realistic illumination
import * as THREE from 'three';

function addLighting(scene) {
    // Ambient light provides soft, uniform illumination across the scene.
    // It ensures all objects are visible without casting shadows.
    const ambient = new THREE.AmbientLight(0xffffff, 0.5); // Intensity set to 0.5 for balanced brightness
    scene.add(ambient);

    // Directional light simulates sunlight and adds depth to the scene.
    // Shadows are enabled to enhance realism and provide visual contrast.
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8); // Intensity set to 0.8 for stronger highlights
    dirLight.position.set(5, 10, 7); // Positioned to mimic sunlight coming from above
    dirLight.castShadow = true; // Shadows are enabled for added realism

    // Configure shadow properties for better resolution and performance
    dirLight.shadow.mapSize.width = 1024; // Higher resolution for sharper shadows
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 1; // Near clipping plane for shadow rendering
    dirLight.shadow.camera.far = 30; // Far clipping plane to limit shadow distance
    dirLight.shadow.camera.left = -8; // Define shadow camera bounds for coverage
    dirLight.shadow.camera.right = 8;
    dirLight.shadow.camera.top = 8;
    dirLight.shadow.camera.bottom = -8;

    scene.add(dirLight);
}

export { addLighting };