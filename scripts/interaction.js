// interaction.js
// Handles raycasting, mouse events, highlighting, and overlay panel
import * as THREE from 'three';

let raycaster, mouse, INTERSECTED, SELECTED, overlayPanel, lastClickTimeout;
const hoverColor = 0xffe066; // color for hover effect
const clickScale = 1.12; // scale factor for click effect

function initInteraction(scene, camera, renderer, canvas) {
    // initialize raycaster and mouse vector
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    overlayPanel = document.getElementById('part-overlay'); // overlay panel for part info

    // add event listeners for mouse movement and clicks
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('click', onPointerClick);
}

function onPointerMove(event) {
    // calculate normalized mouse coordinates
    const rect = event.target.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // update raycaster based on mouse position
    raycaster.setFromCamera(mouse, window.camera || camera);
    const intersects = raycaster.intersectObjects(window.scene?.children || scene.children, true);

    // reset hover effect if no intersection
    if (INTERSECTED && (!intersects.length || INTERSECTED !== intersects[0].object)) {
        INTERSECTED.material.emissive?.setHex(INTERSECTED.currentHex || 0x000000);
        INTERSECTED = null;
        overlayPanel.style.display = 'none'; // hide overlay panel
    }

    // apply hover effect if intersection occurs
    if (intersects.length) {
        const obj = intersects[0].object;
        if (obj !== INTERSECTED) {
            INTERSECTED = obj;
            INTERSECTED.currentHex = INTERSECTED.material.emissive?.getHex() || 0x000000;
            INTERSECTED.material.emissive?.setHex(hoverColor); // change color on hover
            overlayPanel.textContent = obj.name || 'Part'; // display part name
            overlayPanel.style.display = 'block';
            overlayPanel.style.left = event.clientX + 12 + 'px';
            overlayPanel.style.top = event.clientY - 12 + 'px';
        }
    }
}

function onPointerClick(event) {
    if (!INTERSECTED) return; // skip if no object is hovered
    const obj = INTERSECTED;

    // apply click effect (scale and color change)
    if (lastClickTimeout) clearTimeout(lastClickTimeout);
    const origScale = obj.scale.clone();
    obj.scale.set(origScale.x * clickScale, origScale.y * clickScale, origScale.z * clickScale);
    obj.material.emissive?.setHex(0xff5e5e); // change color on click
    overlayPanel.textContent = obj.name || 'Part'; // update overlay panel
    overlayPanel.style.display = 'block';
    overlayPanel.style.left = event.clientX + 12 + 'px';
    overlayPanel.style.top = event.clientY - 12 + 'px';

    // reset scale and color after a short delay
    lastClickTimeout = setTimeout(() => {
        obj.scale.copy(origScale);
        obj.material.emissive?.setHex(hoverColor);
    }, 350);
}

export { initInteraction };