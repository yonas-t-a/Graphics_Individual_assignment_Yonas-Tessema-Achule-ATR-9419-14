import * as THREE from 'three';

// Function to create the floor of the scene
function createFloor() {
    // Load a texture for the floor surface to give it a realistic appearance
    const floorTexture = new THREE.TextureLoader().load('textures/floor.jpg'); 

    // Use MeshStandardMaterial to ensure the floor interacts realistically with lighting
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });

    // Create a plane geometry for the floor with dimensions 10x9 units
    // These dimensions were chosen to fit the scale of the scene
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 9), floorMaterial);

    // Rotate the floor to lie flat on the XZ plane (horizontal surface)
    floor.rotation.x = -Math.PI / 2; 

    // Enable the floor to receive shadows, enhancing depth and realism in the scene
    floor.receiveShadow = true;

    return floor; // Return the floor mesh to be added to the scene
}

export { createFloor };