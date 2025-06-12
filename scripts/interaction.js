// interaction.js
// Handles raycasting, mouse events, highlighting, and overlay panel
import * as THREE from 'three';

let raycaster, mouse, INTERSECTED, SELECTED, overlayPanel, lastClickTimeout;
const hoverColor = 0xffe066; // color used for hover effect on intersected objects
const clickScale = 1.12; // scale factor applied to objects when clicked

function initInteraction(scene, camera, renderer, canvas) {
    // Initialize raycaster for detecting intersections and mouse vector for tracking pointer position
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Get the overlay panel element for displaying part information
    overlayPanel = document.getElementById('part-overlay');

    // Add event listeners for mouse movement and clicks
    canvas.addEventListener('mousemove', onPointerMove); // Handle hover effects
    canvas.addEventListener('click', onPointerClick); // Handle click effects
}

function onPointerMove(event) {
    // Calculate normalized mouse coordinates based on the canvas dimensions
    const rect = event.target.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update raycaster to detect intersections with objects in the scene
    raycaster.setFromCamera(mouse, window.camera || camera);
    const intersects = raycaster.intersectObjects(window.scene?.children || scene.children, true);

    // Reset hover effect if no intersection is detected
    if (INTERSECTED && (!intersects.length || INTERSECTED !== intersects[0].object)) {
        INTERSECTED.material.emissive?.setHex(INTERSECTED.currentHex || 0x000000); // Restore original color
        INTERSECTED = null;
        overlayPanel.style.display = 'none'; // Hide overlay panel
    }

    // Apply hover effect if an intersection is detected
    if (intersects.length) {
        const obj = intersects[0].object;
        if (obj !== INTERSECTED) {
            INTERSECTED = obj;
            INTERSECTED.currentHex = INTERSECTED.material.emissive?.getHex() || 0x000000; // Store original color
            INTERSECTED.material.emissive?.setHex(hoverColor); // Change color to hover effect
            overlayPanel.textContent = obj.name || 'Part'; // Display part name in overlay panel
            overlayPanel.style.display = 'block'; // Show overlay panel
            overlayPanel.style.left = event.clientX + 12 + 'px'; // Position overlay panel near pointer
            overlayPanel.style.top = event.clientY - 12 + 'px';
        }
    }
}

function onPointerClick(event) {
    if (!INTERSECTED) return; // Skip if no object is hovered
    const obj = INTERSECTED;

    // Apply click effect by scaling the object and changing its color
    if (lastClickTimeout) clearTimeout(lastClickTimeout); // Clear previous timeout if any
    const origScale = obj.scale.clone(); // Store original scale
    obj.scale.set(origScale.x * clickScale, origScale.y * clickScale, origScale.z * clickScale); // Apply scaling
    obj.material.emissive?.setHex(0xff5e5e); // Change color to click effect
    overlayPanel.textContent = obj.name || 'Part'; // Update overlay panel with part name
    overlayPanel.style.display = 'block'; // Show overlay panel
    overlayPanel.style.left = event.clientX + 12 + 'px'; // Position overlay panel near pointer
    overlayPanel.style.top = event.clientY - 12 + 'px';

    // Reset scale and color after a short delay
    lastClickTimeout = setTimeout(() => {
        obj.scale.copy(origScale); // Restore original scale
        obj.material.emissive?.setHex(hoverColor); // Restore hover color
    }, 350);
}

export { initInteraction };