import * as THREE from 'three';

// Function to create the floor of the scene
function createFloor() {
    // Load a texture for the floor surface
    const floorTexture = new THREE.TextureLoader().load('textures/floor.jpg'); 
    // Apply the texture to a standard material for realistic lighting effects
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    // Create a plane geometry for the floor with specified dimensions
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 9), floorMaterial);
    // Rotate the floor to lie flat on the XZ plane
    floor.rotation.x = -Math.PI / 2; 
    // Enable the floor to receive shadows for better visual realism
    floor.receiveShadow = true;
    return floor; // Return the floor mesh to be added to the scene
}

export { createFloor };