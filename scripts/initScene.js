// Sets up the Three.js scene, renderer, camera, and OrbitControls
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

function initScene(canvas) {
    // create the scene and set the background color to light gray
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // neutral background for better visibility

    // set up the perspective camera with a 45-degree field of view
    const aspect = window.innerWidth / window.innerHeight; // maintain aspect ratio
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100); // near and far clipping planes
    camera.position.set(6, 5, 8); // position the camera to provide a clear view of the scene
    camera.lookAt(0, 0, 0); // make the camera focus on the center of the scene

    // set up the renderer with antialiasing for smoother edges and shadow support for realism
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // match the renderer size to the window
    renderer.setPixelRatio(window.devicePixelRatio); // optimize for high-resolution displays
    renderer.shadowMap.enabled = true; // enable shadows for depth and realism
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // use soft shadows for smoother edges

    // add orbit controls for user interaction
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // smooth movement for better user experience
    controls.dampingFactor = 0.08; // adjust damping speed for responsiveness
    controls.enablePan = true; // allow panning to explore the scene
    controls.enableZoom = true; // allow zooming to focus on specific objects
    controls.enableRotate = true; // allow rotation for a full view of the scene
    controls.target.set(0, 0.7, 0); // set the target for the camera to focus on the main object
    controls.update(); // refresh controls to apply changes

    // handle window resize to keep the scene responsive
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    if (!camera || !renderer) return; // ensure camera and renderer are initialized
    camera.aspect = window.innerWidth / window.innerHeight; // update camera aspect ratio
    camera.updateProjectionMatrix(); // update projection matrix to reflect new aspect ratio
    renderer.setSize(window.innerWidth, window.innerHeight); // resize the renderer to match the window
}

export { initScene, scene, camera, renderer, controls, onWindowResize };