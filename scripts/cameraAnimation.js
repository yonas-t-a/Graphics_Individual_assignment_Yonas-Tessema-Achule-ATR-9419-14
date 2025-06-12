// cameraAnimation.js
// Manages auto-rotation of the camera around the product

let autoRotate = true; // flag to toggle automatic camera rotation
let angle = 0; // current angle of rotation around the product
let radius = 8; // radius of the camera's orbit around the product
let y = 3; // vertical offset of the camera's position
let center = { x: 0, y: 0.7, z: 0 }; // the point the camera focuses on

// Enables auto-rotation of the camera
function startCameraAnimation() {
    autoRotate = true; // set the flag to enable rotation
}

// Disables auto-rotation of the camera
function stopCameraAnimation() {
    autoRotate = false; // set the flag to disable rotation
}

// Updates the camera's position and orientation for auto-rotation
function updateCameraAnimation(camera, controls) {
    if (!autoRotate) return; // exit early if auto-rotation is disabled

    // increment the rotation angle to create smooth movement
    angle += 0.003; 

    // calculate the camera's position in a circular orbit around the center
    camera.position.x = center.x + radius * Math.cos(angle); // x-coordinate based on angle
    camera.position.z = center.z + radius * Math.sin(angle); // z-coordinate based on angle

    // add a subtle vertical oscillation to simulate dynamic movement
    camera.position.y = y + Math.sin(angle * 0.5) * 0.2;

    // ensure the camera always looks at the center point
    camera.lookAt(center.x, center.y, center.z);

    // update the OrbitControls target to match the center point
    controls.target.set(center.x, center.y, center.z);
    controls.update(); // refresh controls to apply changes
}

export { startCameraAnimation, stopCameraAnimation, updateCameraAnimation };