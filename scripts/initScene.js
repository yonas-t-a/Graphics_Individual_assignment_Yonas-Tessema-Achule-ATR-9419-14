// initScene.js
// Sets up the Three.js scene, renderer, camera, and OrbitControls
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

function initScene(canvas) {
    // create the scene and set the background color
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // set up the perspective camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(6, 5, 8); // position the camera
    camera.lookAt(0, 0, 0); // make the camera look at the center of the scene

    // set up the renderer with antialiasing and shadow support
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; // enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // use soft shadows

    // add orbit controls for user interaction
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // smooth movement
    controls.dampingFactor = 0.08; // adjust damping speed
    controls.enablePan = true; // allow panning
    controls.enableZoom = true; // allow zooming
    controls.enableRotate = true; // allow rotation
    controls.target.set(0, 0.7, 0); // set the target for the camera
    controls.update(); // update controls

    // handle window resize to keep the scene responsive
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight; // update camera aspect ratio
    camera.updateProjectionMatrix(); // update projection matrix
    renderer.setSize(window.innerWidth, window.innerHeight); // resize the renderer
}

export { initScene, scene, camera, renderer, controls, onWindowResize };