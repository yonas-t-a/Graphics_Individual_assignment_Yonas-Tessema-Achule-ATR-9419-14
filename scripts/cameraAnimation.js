// cameraAnimation.js
// Manages auto-rotation of the camera around the product

let autoRotate = true; // Flag to control auto-rotation
let angle = 0; // Current angle of rotation
let radius = 8; // Radius of the camera's orbit
let y = 3; // Vertical offset of the camera
let center = { x: 0, y: 0.7, z: 0 }; // Center point the camera looks at

// Enables auto-rotation of the camera
function startCameraAnimation() {
    autoRotate = true;
}

// Disables auto-rotation of the camera
function stopCameraAnimation() {
    autoRotate = false;
}

// Updates the camera's position and orientation for auto-rotation
function updateCameraAnimation(camera, controls) {
    if (!autoRotate) return; // Skip if auto-rotation is disabled
    angle += 0.003; // Increment the rotation angle
    camera.position.x = center.x + radius * Math.cos(angle); // Calculate X position
    camera.position.z = center.z + radius * Math.sin(angle); // Calculate Z position
    camera.position.y = y + Math.sin(angle * 0.5) * 0.2; // Add subtle vertical oscillation
    camera.lookAt(center.x, center.y, center.z); // Ensure the camera always looks at the center
    controls.target.set(center.x, center.y, center.z); // Update OrbitControls target
    controls.update(); // Refresh controls
}

export { startCameraAnimation, stopCameraAnimation, updateCameraAnimation };