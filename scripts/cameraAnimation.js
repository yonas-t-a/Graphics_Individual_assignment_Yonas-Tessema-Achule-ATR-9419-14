// cameraAnimation.js
// Manages auto-rotation of the camera around the sofa
let autoRotate = true;
let angle = 0;
let radius = 8;
let y = 3;
let center = { x: 0, y: 0.7, z: 0 };

function startCameraAnimation() {
    autoRotate = true;
}

function stopCameraAnimation() {
    autoRotate = false;
}

function updateCameraAnimation(camera, controls) {
    if (!autoRotate) return;
    angle += 0.003;
    camera.position.x = center.x + radius * Math.cos(angle);
    camera.position.z = center.z + radius * Math.sin(angle);
    camera.position.y = y + Math.sin(angle * 0.5) * 0.2;
    camera.lookAt(center.x, center.y, center.z);
    controls.target.set(center.x, center.y, center.z);
    controls.update();
}

export { startCameraAnimation, stopCameraAnimation, updateCameraAnimation }; 