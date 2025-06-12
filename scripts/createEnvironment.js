import * as THREE from 'three';

function createFloor() {
    const floorTexture = new THREE.TextureLoader().load('textures/floor.jpg'); // Add a floor texture
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    floor.receiveShadow = true;
    return floor;
}


export { createFloor };