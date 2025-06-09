// interaction.js
// Handles raycasting, mouse events, highlighting, and overlay panel
import * as THREE from 'three';

let raycaster, mouse, INTERSECTED, SELECTED, overlayPanel, lastClickTimeout;
const hoverColor = 0xffe066;
const clickScale = 1.12;

function initInteraction(scene, camera, renderer, canvas) {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    overlayPanel = document.getElementById('part-overlay');

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('click', onPointerClick);
}

function onPointerMove(event) {
    const rect = event.target.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, window.camera || camera);
    const intersects = raycaster.intersectObjects(window.scene?.children || scene.children, true);

    if (INTERSECTED && (!intersects.length || INTERSECTED !== intersects[0].object)) {
        INTERSECTED.material.emissive?.setHex(INTERSECTED.currentHex || 0x000000);
        INTERSECTED = null;
        overlayPanel.style.display = 'none';
    }
    if (intersects.length) {
        const obj = intersects[0].object;
        if (obj !== INTERSECTED) {
            INTERSECTED = obj;
            INTERSECTED.currentHex = INTERSECTED.material.emissive?.getHex() || 0x000000;
            INTERSECTED.material.emissive?.setHex(hoverColor);
            overlayPanel.textContent = obj.name || 'Part';
            overlayPanel.style.display = 'block';
            overlayPanel.style.left = event.clientX + 12 + 'px';
            overlayPanel.style.top = event.clientY - 12 + 'px';
        }
    }
}

function onPointerClick(event) {
    if (!INTERSECTED) return;
    const obj = INTERSECTED;
    if (lastClickTimeout) clearTimeout(lastClickTimeout);
    const origScale = obj.scale.clone();
    obj.scale.set(origScale.x * clickScale, origScale.y * clickScale, origScale.z * clickScale);
    obj.material.emissive?.setHex(0xff5e5e);
    overlayPanel.textContent = obj.name || 'Part';
    overlayPanel.style.display = 'block';
    overlayPanel.style.left = event.clientX + 12 + 'px';
    overlayPanel.style.top = event.clientY - 12 + 'px';
    lastClickTimeout = setTimeout(() => {
        obj.scale.copy(origScale);
        obj.material.emissive?.setHex(hoverColor);
    }, 350);
}

export { initInteraction }; 